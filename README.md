<p align="center">
  <img src="https://img.shields.io/badge/VitaPredict-AI%20Healthcare-DC3545?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyMS4zNWwtMS40NS0xLjMyQzUuNCAxNS4zNiAyIDEyLjI4IDIgOC41IDIgNS40MiA0LjQyIDMgNy41IDNjMS43NCAwIDMuNDEuODEgNC41IDIuMDlDMTMuMDkgMy44MSAxNC43NiAzIDE2LjUgMyAxOS41OCAzIDIyIDUuNDIgMjIgOC41YzAgMy43OC0zLjQgNi44Ni04LjU1IDExLjU0TDEyIDIxLjM1eiIvPjwvc3ZnPg==&logoColor=white" alt="VitaPredict" />
</p>

<h1 align="center">🫀 VitaPredict</h1>

<p align="center">
  <strong>AI-Powered Healthcare Prediction Platform</strong><br/>
  <em>Predict. Prevent. Protect.</em>
</p>

<p align="center">
  <a href="https://deeyeti.github.io/HealthcarePrediction/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-DC3545?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Canvas_API-FF6B6B?style=flat-square&logo=html5&logoColor=white" />
</p>

---

## ✨ Overview

**VitaPredict** is a modern healthcare prediction platform that combines machine learning concepts with clean, interactive UI to provide personalized health risk assessments. The app features a stunning **particle heart animation** built from scratch using the Canvas API, elegant forms, and detailed risk analysis with visual feature-importance breakdowns.

> ⚠️ **Disclaimer:** This tool is for educational and informational purposes only. It does not replace professional medical advice.

---

## 🩺 Prediction Modules

| Module | Description | Key Inputs |
|--------|-------------|------------|
| **🫀 Cardiovascular Disease** | Assesses cardiovascular risk with bias-aware analysis | Blood pressure, cholesterol, BMI, lifestyle |
| **💉 Diabetes Prediction** | Predicts diabetes risk using metabolic indicators | Glucose, BMI, insulin, blood pressure, age |
| **❤️ Heart Disease (XAI)** | Explainable AI with SHAP-style feature importance | Chest pain type, ECG, ST depression, thalassemia |
| **⚖️ Obesity Risk** | Evaluates obesity risk from lifestyle factors | Diet, physical activity, family history, meals |

Each module provides:
- 📊 **Probability score** with risk level classification (Low / Moderate / High)
- 📈 **Visual progress bars** for at-a-glance risk assessment
- 🔍 **Feature importance chart** showing which factors contribute most
- 💡 **Clinical interpretation** with actionable health insights

---

## 🎨 Design Highlights

<table>
  <tr>
    <td width="50%">

### 🫀 Interactive Particle Heart
A custom-built **Canvas 2D** particle system renders ~900 tiny particles drifting in a heart formation. Features include:
- Subtle mouse-cursor repulsion
- Organic breathing/twinkle animation
- Additive glow blending
- Three-layer composition (outline, fill, sparkle)

</td>
    <td width="50%">

### 🧬 Clean Medical UI
- **Outfit + Inter** typography for a premium feel
- Medical red accent color palette
- Responsive glassmorphic navbar
- Smooth form interactions with range sliders
- Card-based layout with hover micro-animations

</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

```
Frontend         HTML5 · CSS3 · Vanilla JavaScript (ES Modules)
Particle Engine  Canvas 2D API — custom particle physics from scratch
Build Tool       Vite 6
Deployment       GitHub Pages (via gh-pages)
Typography       Google Fonts (Outfit, Inter, JetBrains Mono)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/deeyeti/HealthcarePrediction.git
cd HealthcarePrediction

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
VitaPredict/
├── index.html              # Landing page with particle heart hero
├── cardiovascular.html     # Cardiovascular disease predictor
├── diabetes.html           # Diabetes risk predictor
├── heart-disease.html      # Heart disease predictor (XAI)
├── obesity.html            # Obesity risk predictor
├── css/
│   └── styles.css          # Full design system & component styles
├── js/
│   ├── logo-shader.js      # 2D Canvas particle heart engine
│   └── predictions.js      # Mock ML prediction logic
├── vite.config.js          # Vite build configuration
└── package.json
```

---

## 🔬 How the Predictions Work

The prediction engine (`predictions.js`) uses **rule-based scoring** inspired by real clinical thresholds:

1. **Risk factors** are evaluated individually (e.g., blood pressure > 140 mmHg → +20% risk)
2. **Scores accumulate** across all relevant factors
3. Results are **clamped** to realistic probability ranges (5%–95%)
4. **Feature importance** is ranked by absolute impact, mimicking SHAP values
5. **Risk levels** are classified as Low / Moderate / High based on probability thresholds

> 💡 In a production setting, these rules would be replaced with actual trained ML models (e.g., Random Forest, XGBoost, or neural networks) serving predictions via an API.

---

## 📄 License

This project is for **educational purposes only**. The predictions are based on statistical heuristics and should never substitute professional medical consultation.

---

<p align="center">
  <sub>Built with ❤️ for better health awareness</sub>
</p>
