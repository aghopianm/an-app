import jwt  # Import JWT
import datetime  # For token expiration
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
bcrypt = Bcrypt(app)

# Secret key for JWT (keep this safe!)
SECRET_KEY = "your_secret_key_here"

# Login route with JWT
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT id, email, password, name FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user[2], password):
        # Generate JWT Token
        token = jwt.encode(
            {"user_id": user[0], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)}, 
            SECRET_KEY, 
            algorithm="HS256"
        )
        
        return jsonify({"user": {"email": user[1], "name": user[3]}, "token": token}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)
