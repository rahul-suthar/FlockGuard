#checks if ML service is running

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__) # Create a Blueprint for health check routes
@health_bp.route("/health" , methods=['GET']) #route decorator

def health_check():
  return jsonify({"status": "ok" , "message" : "ML service is running"}) # Return a JSON response indicating service status