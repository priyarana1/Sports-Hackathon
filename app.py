import os
from flask import Flask, redirect, url_for, session
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")  # Load the secret key from .env

# OAuth Configuration
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    authorize_params={"scope": "openid email profile"},
    access_token_url="https://oauth2.googleapis.com/token",
    access_token_params=None,
    client_kwargs={"scope": "openid email profile"}
)

@app.route("/")
def home():
    return "Welcome! <a href='/login'>Login with Google</a>"

@app.route("/login")
def login():
    session["nonce"] = os.urandom(16).hex()  
    return google.authorize_redirect(
        redirect_uri=url_for("authorized", _external=True),
        nonce=session["nonce"]  
    )

@app.route("/login/callback")
def authorized():
    token = google.authorize_access_token() 
    nonce = session.get("nonce")

    if not nonce:
        return "Error: Nonce not found in session"

    user_info = google.parse_id_token(token, nonce=session["nonce"])
    return f"Logged in as: {user_info['email']}"

if __name__ == "__main__":
    app.run(debug=True)
