/**
 * VitaPredict - Mock Prediction Engine
 * Provides realistic health predictions based on medical thresholds
 */

// ==========================================
// Cardiovascular Disease Prediction
// ==========================================
export function predictCardiovascular(data) {
    const { age, gender, bloodPressureSys, bloodPressureDia, cholesterol, bmi, smoking, alcohol, physical } = data;

    let riskScore = 0;
    const factors = [];

    // Age factor
    if (age >= 65) {
        riskScore += 0.25;
        factors.push({ name: 'Age (65+)', impact: 0.25, positive: true });
    } else if (age >= 55) {
        riskScore += 0.15;
        factors.push({ name: 'Age (55-64)', impact: 0.15, positive: true });
    } else if (age >= 45) {
        riskScore += 0.08;
        factors.push({ name: 'Age (45-54)', impact: 0.08, positive: true });
    } else {
        factors.push({ name: 'Age (<45)', impact: -0.1, positive: false });
    }

    // Blood Pressure (Systolic)
    if (bloodPressureSys >= 180) {
        riskScore += 0.3;
        factors.push({ name: 'Severe High BP', impact: 0.3, positive: true });
    } else if (bloodPressureSys >= 140) {
        riskScore += 0.2;
        factors.push({ name: 'High Blood Pressure', impact: 0.2, positive: true });
    } else if (bloodPressureSys >= 130) {
        riskScore += 0.1;
        factors.push({ name: 'Elevated BP', impact: 0.1, positive: true });
    } else {
        factors.push({ name: 'Normal BP', impact: -0.1, positive: false });
    }

    // Cholesterol
    if (cholesterol === 'high') {
        riskScore += 0.2;
        factors.push({ name: 'High Cholesterol', impact: 0.2, positive: true });
    } else if (cholesterol === 'borderline') {
        riskScore += 0.1;
        factors.push({ name: 'Borderline Cholesterol', impact: 0.1, positive: true });
    } else {
        factors.push({ name: 'Normal Cholesterol', impact: -0.05, positive: false });
    }

    // BMI
    if (bmi >= 35) {
        riskScore += 0.2;
        factors.push({ name: 'Obesity (Class II+)', impact: 0.2, positive: true });
    } else if (bmi >= 30) {
        riskScore += 0.15;
        factors.push({ name: 'Obesity (Class I)', impact: 0.15, positive: true });
    } else if (bmi >= 25) {
        riskScore += 0.08;
        factors.push({ name: 'Overweight', impact: 0.08, positive: true });
    } else {
        factors.push({ name: 'Healthy Weight', impact: -0.05, positive: false });
    }

    // Lifestyle factors
    if (smoking) {
        riskScore += 0.2;
        factors.push({ name: 'Smoking', impact: 0.2, positive: true });
    } else {
        factors.push({ name: 'Non-Smoker', impact: -0.1, positive: false });
    }

    if (alcohol) {
        riskScore += 0.1;
        factors.push({ name: 'Alcohol Consumption', impact: 0.1, positive: true });
    }

    if (physical) {
        riskScore -= 0.1;
        factors.push({ name: 'Regular Exercise', impact: -0.1, positive: false });
    } else {
        riskScore += 0.1;
        factors.push({ name: 'Sedentary Lifestyle', impact: 0.1, positive: true });
    }

    // Gender adjustment
    if (gender === 'male' && age >= 45) {
        riskScore += 0.05;
        factors.push({ name: 'Male Gender (45+)', impact: 0.05, positive: true });
    }

    // Normalize score
    const probability = Math.max(0.05, Math.min(0.95, riskScore));

    const riskLevel = probability >= 0.6 ? 'high' : probability >= 0.35 ? 'medium' : 'low';

    return {
        probability,
        riskLevel,
        factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).slice(0, 6)
    };
}

// ==========================================
// Diabetes Prediction
// ==========================================
export function predictDiabetes(data) {
    const { glucose, bmi, bloodPressure, age, insulin, skinThickness } = data;

    let riskScore = 0;
    const factors = [];

    // Glucose level (most important factor)
    if (glucose >= 200) {
        riskScore += 0.4;
        factors.push({ name: 'Very High Glucose', impact: 0.4, positive: true });
    } else if (glucose >= 140) {
        riskScore += 0.3;
        factors.push({ name: 'High Glucose', impact: 0.3, positive: true });
    } else if (glucose >= 100) {
        riskScore += 0.15;
        factors.push({ name: 'Pre-Diabetic Glucose', impact: 0.15, positive: true });
    } else {
        factors.push({ name: 'Normal Glucose', impact: -0.15, positive: false });
    }

    // BMI
    if (bmi >= 35) {
        riskScore += 0.25;
        factors.push({ name: 'Severe Obesity', impact: 0.25, positive: true });
    } else if (bmi >= 30) {
        riskScore += 0.18;
        factors.push({ name: 'Obesity', impact: 0.18, positive: true });
    } else if (bmi >= 25) {
        riskScore += 0.1;
        factors.push({ name: 'Overweight', impact: 0.1, positive: true });
    } else {
        factors.push({ name: 'Healthy BMI', impact: -0.1, positive: false });
    }

    // Age
    if (age >= 60) {
        riskScore += 0.15;
        factors.push({ name: 'Age 60+', impact: 0.15, positive: true });
    } else if (age >= 45) {
        riskScore += 0.1;
        factors.push({ name: 'Age 45-59', impact: 0.1, positive: true });
    } else {
        factors.push({ name: 'Young Age', impact: -0.05, positive: false });
    }

    // Blood Pressure
    if (bloodPressure >= 140) {
        riskScore += 0.12;
        factors.push({ name: 'High Blood Pressure', impact: 0.12, positive: true });
    } else if (bloodPressure >= 120) {
        riskScore += 0.06;
        factors.push({ name: 'Elevated BP', impact: 0.06, positive: true });
    } else {
        factors.push({ name: 'Normal BP', impact: -0.05, positive: false });
    }

    // Insulin resistance indicator
    if (insulin > 150) {
        riskScore += 0.15;
        factors.push({ name: 'High Insulin', impact: 0.15, positive: true });
    } else if (insulin > 80) {
        riskScore += 0.08;
        factors.push({ name: 'Elevated Insulin', impact: 0.08, positive: true });
    }

    const probability = Math.max(0.05, Math.min(0.95, riskScore));
    const riskLevel = probability >= 0.55 ? 'high' : probability >= 0.3 ? 'medium' : 'low';

    return {
        probability,
        riskLevel,
        factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).slice(0, 5)
    };
}

// ==========================================
// Heart Disease Prediction (XAI Style)
// ==========================================
export function predictHeartDisease(data) {
    const {
        age, sex, chestPain, restingBP, cholesterol,
        fastingBS, restingECG, maxHR, exerciseAngina,
        stDepression, stSlope, vessels, thalassemia
    } = data;

    let riskScore = 0;
    const factors = [];

    // Age
    if (age >= 65) {
        riskScore += 0.15;
        factors.push({ name: 'Age (65+)', impact: 0.15, positive: true });
    } else if (age >= 55) {
        riskScore += 0.1;
        factors.push({ name: 'Age (55-64)', impact: 0.1, positive: true });
    }

    // Sex
    if (sex === 'male') {
        riskScore += 0.08;
        factors.push({ name: 'Male Sex', impact: 0.08, positive: true });
    }

    // Chest Pain Type
    if (chestPain === 'typical') {
        riskScore += 0.2;
        factors.push({ name: 'Typical Angina', impact: 0.2, positive: true });
    } else if (chestPain === 'atypical') {
        riskScore += 0.12;
        factors.push({ name: 'Atypical Angina', impact: 0.12, positive: true });
    } else if (chestPain === 'nonanginal') {
        riskScore += 0.05;
        factors.push({ name: 'Non-Anginal Pain', impact: 0.05, positive: true });
    }

    // Resting Blood Pressure
    if (restingBP >= 160) {
        riskScore += 0.15;
        factors.push({ name: 'Very High BP', impact: 0.15, positive: true });
    } else if (restingBP >= 140) {
        riskScore += 0.1;
        factors.push({ name: 'High BP', impact: 0.1, positive: true });
    }

    // Cholesterol
    if (cholesterol >= 280) {
        riskScore += 0.15;
        factors.push({ name: 'Very High Cholesterol', impact: 0.15, positive: true });
    } else if (cholesterol >= 240) {
        riskScore += 0.1;
        factors.push({ name: 'High Cholesterol', impact: 0.1, positive: true });
    }

    // Fasting Blood Sugar
    if (fastingBS) {
        riskScore += 0.08;
        factors.push({ name: 'High Fasting Sugar', impact: 0.08, positive: true });
    }

    // Max Heart Rate
    if (maxHR < 120) {
        riskScore += 0.12;
        factors.push({ name: 'Low Max Heart Rate', impact: 0.12, positive: true });
    } else if (maxHR > 170) {
        factors.push({ name: 'Good Max Heart Rate', impact: -0.1, positive: false });
    }

    // Exercise Induced Angina
    if (exerciseAngina) {
        riskScore += 0.18;
        factors.push({ name: 'Exercise Angina', impact: 0.18, positive: true });
    }

    // ST Depression
    if (stDepression >= 2) {
        riskScore += 0.2;
        factors.push({ name: 'High ST Depression', impact: 0.2, positive: true });
    } else if (stDepression >= 1) {
        riskScore += 0.1;
        factors.push({ name: 'Moderate ST Depression', impact: 0.1, positive: true });
    }

    // Number of Major Vessels
    if (vessels >= 2) {
        riskScore += 0.2;
        factors.push({ name: 'Multiple Vessel Issues', impact: 0.2, positive: true });
    } else if (vessels === 1) {
        riskScore += 0.1;
        factors.push({ name: 'Single Vessel Issue', impact: 0.1, positive: true });
    }

    // Thalassemia
    if (thalassemia === 'reversible') {
        riskScore += 0.15;
        factors.push({ name: 'Reversible Defect', impact: 0.15, positive: true });
    } else if (thalassemia === 'fixed') {
        riskScore += 0.1;
        factors.push({ name: 'Fixed Defect', impact: 0.1, positive: true });
    }

    const probability = Math.max(0.05, Math.min(0.95, riskScore));
    const riskLevel = probability >= 0.5 ? 'high' : probability >= 0.3 ? 'medium' : 'low';

    return {
        probability,
        riskLevel,
        factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).slice(0, 8)
    };
}

// ==========================================
// Obesity Risk Prediction
// ==========================================
export function predictObesity(data) {
    const {
        height, weight, age, gender,
        vegetables, meals, water,
        physicalActivity, alcohol, familyHistory
    } = data;

    // Calculate BMI
    const bmi = weight / ((height / 100) ** 2);

    let riskScore = 0;
    const factors = [];

    // Current BMI
    if (bmi >= 40) {
        riskScore += 0.4;
        factors.push({ name: 'Severe Obesity (BMI 40+)', impact: 0.4, positive: true });
    } else if (bmi >= 35) {
        riskScore += 0.35;
        factors.push({ name: 'Obesity Class II', impact: 0.35, positive: true });
    } else if (bmi >= 30) {
        riskScore += 0.25;
        factors.push({ name: 'Obesity Class I', impact: 0.25, positive: true });
    } else if (bmi >= 25) {
        riskScore += 0.15;
        factors.push({ name: 'Overweight', impact: 0.15, positive: true });
    } else if (bmi >= 18.5) {
        factors.push({ name: 'Healthy BMI', impact: -0.15, positive: false });
    } else {
        factors.push({ name: 'Underweight', impact: 0.05, positive: true });
    }

    // Physical Activity
    if (physicalActivity === 'none') {
        riskScore += 0.2;
        factors.push({ name: 'No Physical Activity', impact: 0.2, positive: true });
    } else if (physicalActivity === 'low') {
        riskScore += 0.1;
        factors.push({ name: 'Low Activity', impact: 0.1, positive: true });
    } else if (physicalActivity === 'high') {
        riskScore -= 0.15;
        factors.push({ name: 'High Activity', impact: -0.15, positive: false });
    }

    // Vegetable Consumption
    if (vegetables < 2) {
        riskScore += 0.1;
        factors.push({ name: 'Low Vegetable Intake', impact: 0.1, positive: true });
    } else if (vegetables >= 4) {
        riskScore -= 0.1;
        factors.push({ name: 'High Vegetable Intake', impact: -0.1, positive: false });
    }

    // Number of meals
    if (meals > 3) {
        riskScore += 0.1;
        factors.push({ name: 'Frequent Eating', impact: 0.1, positive: true });
    }

    // Water intake
    if (water < 4) {
        riskScore += 0.05;
        factors.push({ name: 'Low Water Intake', impact: 0.05, positive: true });
    }

    // Alcohol
    if (alcohol === 'frequently') {
        riskScore += 0.1;
        factors.push({ name: 'Frequent Alcohol', impact: 0.1, positive: true });
    }

    // Family History
    if (familyHistory) {
        riskScore += 0.15;
        factors.push({ name: 'Family History', impact: 0.15, positive: true });
    }

    // Age factor
    if (age >= 50) {
        riskScore += 0.1;
        factors.push({ name: 'Age 50+', impact: 0.1, positive: true });
    }

    const probability = Math.max(0.05, Math.min(0.95, riskScore));
    const riskLevel = probability >= 0.5 ? 'high' : probability >= 0.3 ? 'medium' : 'low';

    // Determine obesity category
    let category = 'Normal Weight';
    if (bmi >= 40) category = 'Obesity Type III';
    else if (bmi >= 35) category = 'Obesity Type II';
    else if (bmi >= 30) category = 'Obesity Type I';
    else if (bmi >= 25) category = 'Overweight';
    else if (bmi < 18.5) category = 'Underweight';

    return {
        probability,
        riskLevel,
        bmi: bmi.toFixed(1),
        category,
        factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).slice(0, 6)
    };
}

// ==========================================
// Utility Functions
// ==========================================
export function getRiskColor(riskLevel) {
    switch (riskLevel) {
        case 'high': return 'var(--danger)';
        case 'medium': return 'var(--warning)';
        case 'low': return 'var(--success)';
        default: return 'var(--secondary)';
    }
}

export function getRiskLabel(riskLevel) {
    switch (riskLevel) {
        case 'high': return 'High Risk';
        case 'medium': return 'Moderate Risk';
        case 'low': return 'Low Risk';
        default: return 'Unknown';
    }
}
