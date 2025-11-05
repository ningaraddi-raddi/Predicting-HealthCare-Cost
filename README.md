# PREDICTING HEALTHCARE COSTS

**Predicting annual medical expenditure** using a hybrid dataset enhanced with a clinically-inspired feature (`chronic_conditions`) and a Gradient Boosting Regressor (GBR).  
The final deliverable is an explainable, interactive web app that supports real-time predictions and "what-if" lifestyle simulations powered by SHAP.

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Dataset](#dataset)  
4. [Methodology](#methodology)  
5. [Modeling & Evaluation](#modeling--evaluation)  
6. [Explainability (SHAP)](#explainability-shap)  
7. [Web App & API](#web-app--api)  
8. [Reproduce Results (Quickstart)](#reproduce-results-quickstart)  
9. [Project Structure](#project-structure)  
10. [Future Work](#future-work)  
11. [References](#references)  
12. [Contact](#contact)

---

## Project Overview
Healthcare expenditure forecasting is important for individuals, insurers, and policymakers. This project improves prediction accuracy by:
- Augmenting the Kaggle Insurance Forecast dataset with a clinically-inspired synthetic feature `chronic_conditions` (derived from MEPS insights),
- Training and selecting a Gradient Boosting Regressor (GBR) for its strong performance on structured/tabular data,
- Integrating SHAP for model interpretability,
- Deploying an interactive web application (React frontend + Flask backend) for real-time predictions and what-if simulations.

---

## Features
- Hybrid dataset with an engineered `chronic_conditions` feature.
- Preprocessing pipeline (imputation, one-hot encoding, scaling, outlier capping, log-transform for `charges`).
- Model comparison: Linear Regression, Random Forest, XGBoost, Gradient Boosting Regressor (GBR selected).
- Hyperparameter tuning for GBR.
- SHAP-based global and local explainability.
- Interactive web UI allowing users to input features and run "what-if" scenarios (e.g., quitting smoking).
- Dockerized backend for easy deployment.

---

## Dataset
- **Primary:** Kaggle Insurance Forecast dataset (~1,338 observations).  
  - Numerical: `age`, `bmi`, `children`  
  - Categorical: `sex`, `smoker`, `region`  
  - Target: `charges`
- **Augmentation:** `chronic_conditions` — synthetic, clinically-inspired feature derived using patterns from the MEPS dataset (e.g., age, smoking status, BMI > 30 increase likelihood).

**Final features used**:
- Numerical: `age`, `bmi`, `children`, `chronic_conditions`  
- Categorical: `sex`, `smoker`, `region`  
- Target: `charges` (log-transformed during training)

> ⚠️ This repo includes code to generate `chronic_conditions` from rules and to reproduce the augmentation; if you later replace with real EHR-derived data, update the generator accordingly.

---

## Methodology

### Preprocessing
- Missing values: categorical → `"Missing"`, numerical → median fill.
- Feature engineering: `chronic_conditions`; interaction term `smoker × chronic_conditions`.
- Outlier treatment: IQR capping on numerical features.
- Target transform: `log1p(charges)` to reduce skew.
- Encoding & scaling: One-Hot Encoding for categoricals; `StandardScaler` for numericals.

### Modeling
- Models trained & compared:
  1. Linear Regression
  2. Random Forest Regressor
  3. XGBoost Regressor
  4. Gradient Boosting Regressor (GBR) — final model
- Evaluation metrics: R², RMSE, MAE
- GBR hyperparameter tuning (grid search / randomized search):
  - `n_estimators`: 100–300
  - `learning_rate`: 0.05–0.2
  - `max_depth`: 3–6
  - `subsample`: 0.8–1.0

---

## Modeling & Evaluation — Results (Summary)

| Model | R² | RMSE | MAE |
|---|---:|---:|---:|
| Linear Regression | 0.74 | 4600 | 3200 |
| Random Forest | 0.86 | 3200 | 2300 |
| XGBoost | 0.87 | 3100 | 2200 |
| Gradient Boosting Regressor | **0.89** | **2900** | **2050** |

GBR provided the best tradeoff between accuracy and interpretability.

---

## Explainability (SHAP)
- SHAP used for both global and local interpretability.
- Key observations:
  - `smoker` is the strongest driver of charges.
  - `bmi` and `chronic_conditions` interact to amplify costs.
  - `age` shows a steady, linear effect.
- SHAP outputs are exposed in the API for UI visualization (force plots, summary plots).

---

## Web App & API
- **Frontend:** React app with sliders & dropdowns for features; displays predicted charges and SHAP explanation plots (images/plotly).
- **Backend:** Flask app exposing endpoints:
  - `POST /predict` — returns `predicted_charges` (and `predicted_charges_untransformed`) and SHAP values.
  - `POST /whatif` — runs simulations for modified inputs.
- **Deployment:** Dockerized backend; static React build served or hosted separately.

---

## Reproduce Results (Quickstart)

### Prerequisites
- Python 3.9+  
- Node.js & npm (for frontend) — optional if you only run backend  
- Docker (optional — for containerized run)

### Install (Python)
```bash
# create virtual env
python -m venv venv
source venv/bin/activate      # macOS / Linux
# venv\Scripts\activate       # Windows PowerShell

pip install -r requirements.txt
