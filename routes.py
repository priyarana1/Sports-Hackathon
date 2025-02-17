from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
)
from datetime import timedelta # imports, with JWT for token handling

app = Flask(__name__) # create flask app

# NEED TO CHANGE DATA TO POSTGRES DATABASE
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://your_username:your_password@localhost/your_database"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # Change this to a strong secret key

db = SQLAlchemy(app) # creating db, password protection, and JWT tokens
bcrypt = Bcrypt(app) 
jwt = JWTManager(app)

revoked_tokens = set()

# user info format
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

# create from postgres
with app.app_context():
    db.create_all()

# allow user to register
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# allow user to login with existing account
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
        return jsonify({"access_token": access_token}), 200

    return jsonify({"error": "Invalid username or password"}), 401

# let user log out
@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # token id
    revoked_tokens.add(jti)  # get rid of token
    return jsonify({"message": "Logged out successfully"}), 200

# JWT token check
@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    return jwt_payload["jti"] in revoked_tokens 


# 🚀 Run the app
if __name__ == "__main__":
    app.run(debug=True)