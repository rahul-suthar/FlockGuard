from flask import Flask
from routes.health import health_bp
from routes.predict import predict_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(health_bp, url_prefix="/api/v1")
app.register_blueprint(predict_bp, url_prefix="/api/v1")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
