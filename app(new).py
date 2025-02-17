import os
from flask import Flask, request, jsonify, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user
)
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")  # Your secret key from .env

# Configure SQLite Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = "login"

# User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    password = db.Column(db.String(256), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Registration endpoint
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    password = data.get("password")
    if not email or not name or not password:
        return jsonify({"error": "Email, name, and password are required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 409
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, name=name, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

# Login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        # Here, for simplicity, we're returning a dummy token.
        # In a real application you might generate a JWT.
        return jsonify({
            "access_token": "dummy-token",
            "user": {"id": user.id, "email": user.email, "name": user.name}
        }), 200
    return jsonify({"error": "Invalid email or password"}), 401

# Logout endpoint
@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

# Get current user endpoint
@app.route("/api/current_user", methods=["GET"])
@login_required
def get_current_user():
    return jsonify({"user": {"id": current_user.id, "email": current_user.email, "name": current_user.name}}), 200

# Update profile endpoint
@app.route("/api/update_profile", methods=["PUT"])
@login_required
def update_profile():
    data = request.get_json()
    new_name = data.get("name")
    new_email = data.get("email")
    if new_name:
        current_user.name = new_name
    if new_email:
        # Check if the new email is already used by another user
        existing_user = User.query.filter_by(email=new_email).first()
        if existing_user and existing_user.id != current_user.id:
            return jsonify({"error": "Email already in use"}), 409
        current_user.email = new_email
    try:
        db.session.commit()
        return jsonify({
            "message": "Profile updated",
            "user": {"name": current_user.name, "email": current_user.email}
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update profile", "details": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
