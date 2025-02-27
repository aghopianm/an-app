import jwt  # Import JWT
import datetime  # For token expiration
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/api/*": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
    "supports_credentials": True
}})
bcrypt = Bcrypt(app)

# Secret key for JWT (keep this safe!)
SECRET_KEY = "your_secret_key_here"

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Check if the email already exists
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT id FROM users WHERE email = ?", (email,))
    existing_user = c.fetchone()

    if existing_user:
        conn.close()
        return jsonify({"error": "Email already registered"}), 400

    # Insert the new user
    try:
        c.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                 (name, email, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
    
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
@app.route("/api/search", methods=["GET"])
def search_users():
    query = request.args.get("query")
    if not query:
        return jsonify({"data": [], "status": "success"}), 200

    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute("SELECT id, name, email FROM users WHERE name LIKE ?", (f"%{query}%",))
        users = c.fetchall()
        conn.close()

        results = [{"id": user[0], "name": user[1], "email": user[2]} for user in users]
        print(f"Search query: {query}")
        print(f"Search results: {results}")
        
        return jsonify({
            "status": "success",
            "data": results
        }), 200

    except Exception as e:
        print(f"Error in search: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    # Update host to use 127.0.0.1
    app.run(debug=True, host='127.0.0.1', port=5000)