








import joblib
import pandas as pd
import numpy as np
import shap
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
# --- Load Artifacts ---

model_path = "model.joblib"
explainer_path = "explainer.joblib"

if not os.path.exists(model_path) or not os.path.exists(explainer_path):
    raise FileNotFoundError("❌ Required model files missing. Please run train.py to generate them.")

try:
    pipeline = joblib.load(model_path)
    explainer = joblib.load(explainer_path)
    print("✅ Model and explainer loaded successfully.")
except Exception as e:
    raise RuntimeError(f"❌ Failed to load model artifacts: {str(e)}")


# --- Pydantic Model for Input Validation ---
# **FIX:** This class no longer includes 'chronic_conditions' to match the new model.
class ModelFeatures(BaseModel):
    age: int
    sex: str
    bmi: float
    children: int
    smoker: str
    region: str
    risk_score: float  # New feature from the updated dataset

# --- FastAPI App Initialization ---
app = FastAPI(
    title="Medical Cost Prediction API",
    description="An API to predict medical costs using the Kaggle dataset.",
    version="5.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"status": "ok", "message": "API is running"}

@app.post("/predict")
def predict_cost(features: ModelFeatures):
    try:
        # Convert the validated input data to a DataFrame for the pipeline
        input_df = pd.DataFrame([features.dict()])
        
        # 1. Make Prediction (the output will be in log scale)
        log_prediction = pipeline.predict(input_df)[0]
        
        # 2. Convert the prediction back to a dollar amount
        predicted_cost = np.expm1(log_prediction)
        
        # 3. Generate SHAP Explanation
        preprocessor = pipeline.named_steps['preprocessor']
        model = pipeline.named_steps['model']
        
        # Transform the input data to get SHAP values
        transformed_input = preprocessor.transform(input_df)
        feature_names = preprocessor.get_feature_names_out()
        
        shap_values = explainer.shap_values(transformed_input)[0]

        # 4. Format the Explanation for the frontend
        contributions = sorted(zip(feature_names, shap_values), key=lambda x: abs(x[1]), reverse=True)
        
        top_factors = []
        for feature, value in contributions[:5]: # Get the top 5 most influential factors
            # Clean up the feature name for better readability
            clean_feature = feature.split('__')[-1].replace('_', ' ')
            top_factors.append({
                "feature": clean_feature.title(),
                "value": float(np.round(value, 2))
            })

        return {
            "predicted_cost": float(np.round(predicted_cost, 2)),
            "top_factors": top_factors
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {str(e)}")

# This allows you to run the script directly for development
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
