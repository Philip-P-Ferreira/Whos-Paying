from flask import Flask, request, jsonify, send_from_directory, session
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from flask_cors import CORS

from werkzeug.security import generate_password_hash, check_password_hash
import random
import string

import math
from datetime import datetime as dt

import requests


app = Flask(__name__, static_url_path="", static_folder="../webapp/build")
CORS(app)

app.secret_key = b'dwflkeqjflkjewqlkfjeqfjeqw;lf'

login_manager = LoginManager()
login_manager.init_app(app)


API_KEY = 'aadb99b17845dafb819bd56a558d92ef'

def transfer(payer_id, payee_id, amount):
    if payer_id == payee_id or amount <= 0:
        return

    url = 'http://api.nessieisreal.com/accounts/{}/transfers?key={}'.format(payer_id, API_KEY)
    payload = {
        'medium':'balance',
        'payee_id':payee_id,
        'amoumt':amount
    }

    response = requests.post(url, data=payload)


def balance(account_id):
    url = 'http://api.nessieisreal.com/accounts/{}?key={}'.format(account_id, API_KEY)

    response = requests.get(url)
    return response.json()["balance"]


class User(UserMixin):
    username: None
    password_hash: None
    customer_id: None
    account_id: None

    def __init__(self, username, password_hash, customer_id, account_id):
        super().__init__()
        self.username = username
        self.password_hash = password_hash
        self.customer_id = customer_id
        self.account_id = account_id

    def get_id(self):
        return str(self.customer_id)


users = [
    User(username="Blaine", password_hash=generate_password_hash(
        "Mitchell"), customer_id=0, account_id="61624e9231d61b772ac8bc05"),
    User(username="David", password_hash=generate_password_hash(
        "Perez"), customer_id=1, account_id="61624f4731d61b772ac8bc06"),
    User(username="Ethan", password_hash=generate_password_hash(
        "Piper"), customer_id=2, account_id="61624f8231d61b772ac8bc07"),
    User(username="Philip", password_hash=generate_password_hash(
        "Ferreira"), customer_id=3, account_id="61624f9a31d61b772ac8bc08"),
    User(username="TestUser1", password_hash=generate_password_hash(
        "testing"), customer_id=4, account_id="61624fba31d61b772ac8bc09"),
    User(username="TestUser2", password_hash=generate_password_hash(
        "testing"), customer_id=5, account_id="61624fd231d61b772ac8bc0a"),
    User(username="TestUser3", password_hash=generate_password_hash(
        "testing"), customer_id=6, account_id="61624fe931d61b772ac8bc0b"),
    User(username="TestUser4", password_hash=generate_password_hash(
        "testing"), customer_id=7, account_id="61624ffb31d61b772ac8bc0c"),
]


def get_user_by_username(username):
    return next((x for x in users if x.username == username), None)


def get_user_by_customer_id(customer_id):
    return next((x for x in users if x.customer_id == customer_id), None)
    


@login_manager.user_loader
def load_user(user_id):
    return get_user_by_customer_id(int(user_id))


lobbies = {}


@app.route("/api/login", methods=['GET'])
def login():
    user = request.args.get("username")
    password = request.args.get("password")

    if get_user_by_username(user) and check_password_hash(get_user_by_username(user).password_hash, password):
        login_user(get_user_by_username(user))
        return "Logged in", 200
    return "Incorrect username or password", 401


@login_required
@app.route("/api/create-lobby", methods=['GET'])
def create_lobby():
    bill = request.args.get("bill")

    lobby_code = ''.join(random.choices(
        string.ascii_uppercase, k=4))

    big_numbers = [25, 50, 75, 100]
    small_numbers = [1, 1, 2, 2, 3, 3, 4, 4,
                     5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
    random.shuffle(big_numbers)
    random.shuffle(small_numbers)

    target = math.floor(random.randint(0, 898) + 101)

    game = {
        "numbers": big_numbers[:2] + small_numbers[:4],
        "target": target,
    }

    lobbies[lobby_code] = {
        "usernames": [{"username": current_user.username, "ready": False, "submitted": None, "timestamp": None}],
        "game": game,
        "host": current_user.username,
        "bill": bill
    }
    return jsonify({"lobby-code": lobby_code}), 200


@login_required
@app.route("/api/join-lobby", methods=['GET'])
def join_lobby():
    lobby_code = request.args['lobby-code']
    if lobbies[lobby_code] and not all(x["ready"] for x in lobbies[lobby_code]["usernames"]):
        lobbies[lobby_code]["username"].append(
            {"username": current_user.username})
    return "Joining lobby code " + lobby_code, 200


@login_required
@app.route("/api/lobby-state/<lobby_code>")
def lobby_state(lobby_code):
    state = {
        "starting": 0,  # Will hold UTC timestamp of game start time once every one has readied
        "usernames": [{"username": "Fulano De Tal", "ready": True}, {"username": "John Smith", "ready": False}],
        "win-bill": 10,
        "lose-bill": 30,
        "game": "Countdown",
        "duration": 30,
        "number-winners": 1,
        "percent-bet": 50,
    }
    state = lobbies[lobby_code]
    return jsonify(state), 200


@login_required
@app.route("/api/leave-lobby", methods=['POST'])
def leave_lobby():
    return "", 200


@login_required
@app.route("/api/end-lobby", methods=['POST'])
def end_lobby():
    return "", 200


@login_required
@app.route("/api/ready/<lobby_code>", methods=['GET'])
def ready(lobby_code):
    cu = current_user.username
    user = next((x for x in lobbies[lobby_code]["usernames"] if x["username"] == cu), None)
    user["ready"] = True
    return "Ready", 200


@login_required
@app.route("/api/countdown-game/<lobby_code>")
def countdown_game(lobby_code):
    return jsonify(lobbies[lobby_code]["game"]), 200

@login_required
@app.route("/api/balance")
def get_balance():
    return str(balance(get_user_by_username(current_user.username).account_id))


@login_required
@app.route("/api/countdown-submit/<lobby_code>")
def countdown_submit(lobby_code):
    solution = request.args.get("solution")

    usernames = lobbies[lobby_code]["usernames"]

    user = next((x for x in usernames if x["username"] == current_user.username), None)
    user["submitted"] = True
    user["timestamp"] = dt.now()
    user["solution"] = solution
    if all(x["submitted"] for x in usernames):
        usernames.sort(key=lambda x: (abs(x["solution"]-lobbies[lobby_code]["game"]["target"]), x[1]["timestamp"]))
        get_user_by_username(usernames[-1])

        transfer(get_user_by_username(usernames[-1]).account_id, get_user_by_username(lobbies[lobby_code]["host"]).account_id, lobbies[lobby_code]["bill"])

    return "", 200


@app.route("/")
def index():
    return send_from_directory("../webapp/build", "index.html")
