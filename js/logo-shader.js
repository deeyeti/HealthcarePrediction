/**
 * VitaPredict — Particle Heart
 * Hundreds of tiny particles floating gently in a heart shape.
 * Pure 2D Canvas, no Three.js dependency.
 */

// ─── Heart math helpers ────────────────────────────────────────
function heartX(t) {
    return 16 * Math.pow(Math.sin(t), 3);
}
function heartY(t) {
    return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
}

// ─── Particle class ────────────────────────────────────────────
class Particle {
    constructor(homeX, homeY, opts = {}) {
        this.homeX = homeX;
        this.homeY = homeY;
        this.x = homeX + (Math.random() - 0.5) * 20;
        this.y = homeY + (Math.random() - 0.5) * 20;
        this.vx = 0;
        this.vy = 0;
        this.radius = opts.radius ?? 0.8 + Math.random() * 1.0;
        this.phase = Math.random() * Math.PI * 2;
        this.driftSpeed = 0.2 + Math.random() * 0.35;
        this.driftAmp = 1 + Math.random() * 2;
        this.color = opts.color ?? randomHeartColor();
        this.alpha = 0.55 + Math.random() * 0.45;
    }

    update(time, mouseX, mouseY, mouseActive) {
        // Drift around home position
        const targetX = this.homeX + Math.sin(time * this.driftSpeed + this.phase) * this.driftAmp;
        const targetY = this.homeY + Math.cos(time * this.driftSpeed * 0.8 + this.phase) * this.driftAmp;

        // Spring back toward home (tighter spring = holds shape better)
        this.vx += (targetX - this.x) * 0.045;
        this.vy += (targetY - this.y) * 0.045;

        // Subtle mouse repulsion
        if (mouseActive) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 55;
            if (dist < repelRadius && dist > 0.1) {
                const force = ((repelRadius - dist) / repelRadius) * 1.2;
                this.vx += (dx / dist) * force;
                this.vy += (dy / dist) * force;
            }
        }

        // Damping
        this.vx *= 0.9;
        this.vy *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, time) {
        // Twinkle effect
        const twinkle = 0.7 + 0.3 * Math.sin(time * 3 + this.phase * 5);
        const alpha = this.alpha * twinkle;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha(this.color, alpha);
        ctx.fill();

        // Subtle glow halo
        if (this.radius > 1.4) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = colorWithAlpha(this.color, alpha * 0.12);
            ctx.fill();
        }
    }
}

// ─── Colour helpers ────────────────────────────────────────────
const HEART_COLORS = [
    { r: 220, g: 53, b: 69 },   // primary red
    { r: 255, g: 107, b: 122 }, // soft rose
    { r: 233, g: 30, b: 99 },   // pink
    { r: 255, g: 71, b: 87 },   // bright red
    { r: 248, g: 215, b: 218 }, // blush
    { r: 255, g: 23, b: 68 },   // vivid red
    { r: 198, g: 40, b: 40 },   // deep red
];

function randomHeartColor() {
    return HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
}

function colorWithAlpha(c, a) {
    return `rgba(${c.r},${c.g},${c.b},${a})`;
}

// ─── Main engine ───────────────────────────────────────────────
class ParticleHeartCanvas {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'block';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.particles = [];
        this.mouseX = -9999;
        this.mouseY = -9999;
        this.mouseActive = false;
        this.time = 0;
        this.raf = null;

        this.resize();
        this.createParticles();
        this.listen();
        this.animate();
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    createParticles() {
        this.particles = [];

        const cx = this.width / 2;
        const cy = this.height / 2 - 10;
        const scale = Math.min(this.width, this.height) * 0.025;
        const TOTAL = 900;

        // --- Outline particles (~20 %) — double-layered for crisp edge ---
        const outlineN = Math.floor(TOTAL * 0.20);
        for (let i = 0; i < outlineN; i++) {
            const t = (i / outlineN) * Math.PI * 2;
            // Slight random offset so the edge isn't a perfect line
            const jitter = 0.96 + Math.random() * 0.08;
            const hx = cx + heartX(t) * scale * jitter;
            const hy = cy + heartY(t) * scale * jitter;
            this.particles.push(new Particle(hx, hy, { radius: 0.7 + Math.random() * 0.9 }));
        }

        // --- Dense fill particles (rejection sampling, ~75 %) ---
        const fillN = Math.floor(TOTAL * 0.75);
        const bboxW = 16 * scale;
        const bboxH = 32 * scale;
        let filled = 0;
        let tries = 0;
        while (filled < fillN && tries < fillN * 30) {
            tries++;
            const rx = (Math.random() - 0.5) * 2 * bboxW;
            const ry = (Math.random() - 0.5) * 2 * bboxH;
            if (this.isInsideHeart(rx / scale, ry / scale)) {
                this.particles.push(
                    new Particle(cx + rx, cy + ry, { radius: 0.6 + Math.random() * 0.8 })
                );
                filled++;
            }
        }

        // --- Sparkle / ambient particles (~5 %) — hug close to edge ---
        const sparkleN = TOTAL - this.particles.length;
        for (let i = 0; i < sparkleN; i++) {
            const t = Math.random() * Math.PI * 2;
            const spread = 1.02 + Math.random() * 0.12;
            const hx = cx + heartX(t) * scale * spread;
            const hy = cy + heartY(t) * scale * spread;
            this.particles.push(
                new Particle(hx, hy, {
                    radius: 0.4 + Math.random() * 0.6,
                    color: { r: 248, g: 215, b: 218 },
                })
            );
        }
    }

    /** Point-in-heart test using implicit equation */
    isInsideHeart(x, y) {
        // Normalise to unit heart
        const sx = x / 16;
        const sy = -y / 16;  // flip y back
        const a = sx * sx + sy * sy - 1;
        return a * a * a - sx * sx * sy * sy * sy < 0;
    }

    listen() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            this.mouseActive = true;
        });
        this.container.addEventListener('touchmove', (e) => {
            if (e.touches.length) {
                const rect = this.canvas.getBoundingClientRect();
                this.mouseX = e.touches[0].clientX - rect.left;
                this.mouseY = e.touches[0].clientY - rect.top;
                this.mouseActive = true;
            }
        });
        this.container.addEventListener('mouseleave', () => {
            this.mouseActive = false;
        });
        this.container.addEventListener('touchend', () => {
            this.mouseActive = false;
        });
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
    }

    animate() {
        this.raf = requestAnimationFrame(() => this.animate());
        this.time += 0.016;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // Global additive blending
        ctx.globalCompositeOperation = 'lighter';

        for (const p of this.particles) {
            p.update(this.time, this.mouseX, this.mouseY, this.mouseActive);
            p.draw(ctx, this.time);
        }

        // Reset composite
        ctx.globalCompositeOperation = 'source-over';
    }

    dispose() {
        if (this.raf) cancelAnimationFrame(this.raf);
        if (this.canvas.parentNode) this.container.removeChild(this.canvas);
    }
}

// ─── Public API (same contract as before) ──────────────────────
export function initializeLogo() {
    const container = document.getElementById('logo-canvas');
    if (container) {
        return new ParticleHeartCanvas(container);
    }
    return null;
}
