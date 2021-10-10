from flask import Flask, request, jsonify, send_from_directory, session
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user

from werkzeug.security import generate_password_hash, check_password_hash
import random
import string

app = Flask(__name__)

app.secret_key = b'dwflkeqjflkjewqlkfjeqfjeqw;lf'

login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin):
    username: None
    password_hash: None
    customer_id: None

    def __init__(self, username, password_hash, customer_id):
        super().__init__()
        self.username = username
        self.password_hash = password_hash
        self.customer_id = customer_id

    def get_id(self):
        return str(self.customer_id)

users = [
    User(username="Blaine", password_hash=generate_password_hash(
        "Mitchell"), customer_id=0),
    User(username="David", password_hash=generate_password_hash(
        "Perez"), customer_id=1),
    User(username="Ethan", password_hash=generate_password_hash(
        "Piper"), customer_id=2),
    User(username="Philip", password_hash=generate_password_hash(
        "Ferreira"), customer_id=3),
    User(username="TestUser1", password_hash=generate_password_hash(
        "testing"), customer_id=3),
    User(username="TestUser2", password_hash=generate_password_hash(
        "testing"), customer_id=3),
    User(username="TestUser3", password_hash=generate_password_hash(
        "testing"), customer_id=3),
    User(username="TestUser4", password_hash=generate_password_hash(
        "testing"), customer_id=3),
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

    print(user, password, get_user_by_username(user))

    if get_user_by_username(user) and check_password_hash(get_user_by_username(user).password_hash, password):
        login_user(get_user_by_username(user))
        return "Logged in", 200
    return "Incorrect username or password", 401


# @app.route("/api/register", methods=['POST'])
# def register():
#    return "", 200


@app.route("/api/create-lobby", methods=['GET'])
def create_lobby():
    lobby_code = ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=4))

    lobbies[lobby_code] = {
        "usernames": [{"username": current_user, "ready": True}],
    }
    return jsonify({"lobby-code": lobby_code}), 200


@app.route("/api/join-lobby", methods=['POST'])
def join_lobby():
    lobby_code = request.json['lobby-code']
    return "Joining lobby code " + lobby_code, 200


@app.route("/api/lobby-state")
def lobby_state():
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
    return jsonify(state), 200


@app.route("/api/leave-lobby", methods=['POST'])
def leave_lobby():
    return "", 200


@app.route("/api/end-lobby", methods=['POST'])
def end_lobby():
    return "", 200


@app.route("/api/ready", methods=['POST'])
def ready():
    return "", 200


@app.route("/api/countdown-game")
def countdown_game():
    game = {
        "numbers": [1, 2, 3, 4, 100],
    }
    return jsonify(game), 200


@app.route("/api/countdown-submit")
def countdown_submit():
    return "", 200


@app.route("/<path:path>")
def static_pages(path):
    return send_from_directory("../webapp", path)
