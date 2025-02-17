import os
from flask import Blueprint, render_template, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv # imports

load_dotenv() # load variables

routes_bp = Blueprint("routes", __name__)

# creating db and setup
db = SQLAlchemy()

# flask-login configuration
login_manager = LoginManager()
login_manager.login_view = "routes.login"

# user model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)

@login_manager.user_loader # load user
def load_user(user_id):
    return User.query.get(int(user_id))

@routes_bp.route("/dashboard") #protected route
@login_required
def dashboard():
    return f"Hello, {current_user.name}! Welcome to your dashboard."

@routes_bp.route("/logout") # logout route
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "info")
    return redirect(url_for("routes.home"))

@routes_bp.route("/login/callback") #OAuth callback
def authorized():
    token = session.get("token")
    nonce = session.get("nonce")

    if not token or not nonce:
        flash("Authentication failed.", "danger")
        return redirect(url_for("routes.home"))

    user_info = OAuth.google.parse_id_token(token, nonce=nonce)

    if not user_info:
        flash("Invalid authentication token.", "danger")
        return redirect(url_for("routes.home"))

    email = user_info.get("email")
    name = user_info.get("name")

    user = User.query.filter_by(email=email).first() #creating new user if doesnt exist
    if not user:
        user = User(email=email, name=name)
        db.session.add(user)
        db.session.commit()

    login_user(user)
    return redirect(url_for("routes.dashboard"))

'''
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

if __name__ == "__main__":
    app.run(debug=True)
    '''