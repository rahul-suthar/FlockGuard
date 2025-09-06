from flask import Blueprint, request, jsonify
import joblib, os , numpy as np
from PIL import Image

predict_bp = Blueprint("predict", __name__)

# Load the trained (dummy) model
MODEL_PATH = os.path.join("models", "disease_model.pkl")
model = joblib.load(MODEL_PATH)

label_map = {
    0: "Healthy",
    1: "Avian Influenza",
    2: "African Swine Fever"
}

@predict_bp.route("/", methods=["POST"])
def predict_disease():
    try:
        if "file" not in request.files:
            return jsonify({"success": False, "error": "Image required"}), 400
        
        file = request.files["file"]

        img = Image.open(file.stream).convert("RGB")
        features = np.random.rand(1,20)

        prediction = model.predict(features)[0]

        return jsonify({
            "success": True,
            "prediction": label_map[int(prediction)],
            "confidence": float(np.random.uniform(0.8, 0.99))
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
