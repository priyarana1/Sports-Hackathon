from flask import Flask, redirect, url_for, session, render_template
from authlib.integrations.flask_client import OAuth
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a secure key

# OAuth Configuration
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='',
    client_secret='',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile',
    },
)

# Initialize database
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            picture TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Add user to the database
def add_user(name, email, picture):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT OR IGNORE INTO users (name, email, picture) VALUES (?, ?, ?)', (name, email, picture))
        conn.commit()
    finally:
        conn.close()

# Get all users from the database
def get_all_users():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT name, email, picture FROM users')
    users = cursor.fetchall()
    conn.close()
    return users

# Function to check if user is logged in
def is_logged_in():
    return 'user' in session

@app.route('/')
def index():
    user = session.get('user')  # Get user info from the session
    return render_template('index.html', user=user)

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/callback')
def authorize():
    token = google.authorize_access_token()
    print("Token", token)  # Debug token
    user_info = token.get('userinfo')  # Fetch user info
    print("Info ", user_info)  # Debug user info
    session['user'] = user_info

    # Add user to the database
    add_user(user_info['name'], user_info['email'], user_info['picture'])
    
    return redirect('/')

@app.route('/users')
def users():
    if not is_logged_in():  # Check if the user is logged in
        return redirect(url_for('login'))  # Redirect to login page if not logged in

    users = get_all_users()
    return render_template('users.html', users=users)

@app.route('/logout')
def logout():
    session.clear()  # Clear the session
    return redirect('/')

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
