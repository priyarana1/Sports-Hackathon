from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
)
from datetime import timedelta

app = Flask(__name__)

# NEED TO CHANGE DATA TO POSTGRES DATABASE
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://your_username:your_password@localhost/your_database"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # Change this to a strong secret key

