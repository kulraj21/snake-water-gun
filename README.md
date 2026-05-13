# 🐍💧🔫 Snake Water Gun

> A browser-based twist on Rock Paper Scissors — powered by a pattern-learning AI built with Flask.

## 📖 About

Snake Water Gun is a fun variant of Rock Paper Scissors with a twist — the CPU **learns your move patterns** over time using a frequency-based AI. The more you play, the smarter it gets.

### Rules

| Move | Beats |
|------|-------|
| 🐍 Snake | 💧 Water (drinks it) |
| 💧 Water | 🔫 Gun (douses it) |
| 🔫 Gun | 🐍 Snake (shoots it) |

---

## ✨ Features

- 🤖 **Adaptive AI** — tracks your most-played move and counters it
- 📊 **Live Scoreboard** — tracks wins, losses, and draws across the session
- 🕹️ **Move History** — scrollable strip showing your past moves
- 📱 **Responsive UI** — works on desktop and mobile
- ⚡ **No database needed** — runs entirely in memory

---

## 🗂️ Project Structure

```
snake-water-gun/
├── app.py              # Flask server & game logic
├── ai.py               # Pattern-learning AI
├── templates/
│   └── index.html      # Main game UI
├── static/
│   ├── style.css       # Styling
│   └── script.js       # Frontend game logic
├── requirements.txt    # Python dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kulraj21/snake-water-gun.git
   cd snake-water-gun
   ```

2. **Create a virtual environment** (recommended)

   ```bash
   python -m venv venv
   source venv/bin/activate        # macOS/Linux
   venv\Scripts\activate           # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app**

   ```bash
   python app.py
   ```

5. **Open in your browser**

   ```
   http://127.0.0.1:5000
   ```

---

## 🧠 How the AI Works

The AI lives in `ai.py` and uses a simple but effective **frequency counter strategy**:

1. It tracks every move you make throughout the session
2. After your first move, it identifies your **most frequently played move**
3. It then plays the move that **beats your most common choice**

```
Your most common move → AI's counter
🐍 Snake  →  🔫 Gun
💧 Water  →  🐍 Snake
🔫 Gun    →  💧 Water
```

On the very first move (no history yet), the AI picks randomly. Try mixing up your moves to keep it guessing!

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask |
| AI Logic | Python `collections.Counter` |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| API | RESTful JSON (`/play` endpoint) |

---

## 📡 API Reference

### `POST /play`

Send the player's move and get the result.

**Request body:**
```json
{ "move": "snake" }
```

**Valid moves:** `snake`, `water`, `gun`

**Response:**
```json
{
  "user": "snake",
  "computer": "gun",
  "winner": "computer"
}
```

**Winner values:** `user`, `computer`, `draw`

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for Educational Purposes

---

