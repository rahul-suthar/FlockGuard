from flask import Blueprint, request, jsonify
import joblib
import os
import numpy as np

predict_bp = Blueprint("predict", __name__)

# Load the trained (dummy) model
MODEL_PATH = os.path.join("models", "disease_model.pkl")
model = joblib.load(MODEL_PATH)

@predict_bp.route("/predict-disease", methods=["POST"])
def predict_disease():
    try:
        if "file" in request.files:
            file = request.files["file"]
            # Dummy feature extraction for images
            features = np.random.rand(1, 20)
        else:
            data = request.get_json()
            features = np.array(data.get("features")).reshape(1, -1)

        # Predict using dummy model
        prediction = model.predict(features)[0]

        label_map = {
            0: "Healthy",
            1: "Avian Influenza",
            2: "African Swine Fever"
        }

        return jsonify({
            "success": True,
            "prediction": label_map.get(int(prediction), "Unknown")
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
