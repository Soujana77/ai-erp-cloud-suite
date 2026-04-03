from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# -------- DATABASE --------
def init_db():
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()

    cur.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        quantity INTEGER,
        price REAL
    )
    ''')

    conn.commit()
    conn.close()

init_db()

# -------- LOGIN --------
USER = {
    "email": "admin@test.com",
    "password": "1234"
}

@app.route('/')
def home():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    if email == USER["email"] and password == USER["password"]:
        return redirect('/dashboard')
    else:
        return "Invalid login"

# -------- DASHBOARD --------
@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

# -------- INVENTORY --------
@app.route('/inventory')
def inventory():
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()

    cur.execute("SELECT * FROM products")
    products = cur.fetchall()

    conn.close()

    return render_template("inventory.html", products=products)

@app.route('/add_product', methods=['POST'])
def add_product():
    name = request.form['name']
    quantity = request.form['quantity']
    price = request.form['price']

    conn = sqlite3.connect('database.db')
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)",
        (name, quantity, price)
    )

    conn.commit()
    conn.close()

    return redirect('/inventory')

# -------- RUN --------
if __name__ == '__main__':
    app.run(debug=True)