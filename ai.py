import random
from collections import Counter

choices = ["snake", "water", "gun"]

def predict_move(history):

    # Random move initially
    if len(history) < 3:
        return random.choice(choices)

    # Find user's most common move
    most_common = Counter(history).most_common(1)[0][0]

    # Counter move
    counter = {
        "snake": "gun",
        "water": "snake",
        "gun": "water"
    }

    # 70% AI prediction
    # 30% random move
    if random.random() < 0.7:
        return counter[most_common]

    return random.choice(choices)