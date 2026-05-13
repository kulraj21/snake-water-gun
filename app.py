from flask import Flask, render_template, request, jsonify
from ai import predict_move

app = Flask(__name__)

history = []

def get_winner(user, computer):

    if user == computer:
        return "draw"

    elif (
        (user == "snake" and computer == "water") or
        (user == "water" and computer == "gun") or
        (user == "gun" and computer == "snake")
    ):
        return "user"

    return "computer"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/play", methods=["POST"])
def play():

    data = request.get_json()

    user = data["move"]

    computer = predict_move(history)

    history.append(user)

    winner = get_winner(user, computer)

    return jsonify({
        "user": user,
        "computer": computer,
        "winner": winner
    })


if __name__ == "__main__":
    app.run(debug=True)