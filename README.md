# 🌐 Vishubh Translator

**Vishubh Translator** is a lightweight, web-based language translation application built with **Python (Flask)**. It features a modern, responsive user interface with a dedicated **Dark/Light mode** toggle and utilizes the free [MyMemory API](https://mymemory.translated.net/) for translations.

---

## ✨ Features

* **Language Support:** Translates between multiple languages (English, Hindi, Spanish, French, German, etc.).
* **Dark & Light Mode:** Switch themes instantly. The app remembers your preference using LocalStorage.
* **Smart UI:** Glassmorphism-inspired design that looks great on both desktop and mobile.
* **Swap Languages:** Quickly switch source and target languages.
* **Copy to Clipboard:** One-click button to copy the translated text.
* **Character Counter:** Visual indicator for input text limit.

---

## 📂 Project Structure

```text
├── 📁 static
│   ├── 📄 script.js       # Frontend logic (API calls, UI toggles)
│   └── 🎨 style.css       # CSS variables and styling
├── 📁 templates
│   └── 🌐 index.html      # Main HTML structure
├── ⚙️ .flaskenv           # Flask environment variables
├── ⚙️ .gitignore          # Ignored files
├── 📄 README.md           # Project documentation
└── 🐍 app.py              # Flask backend and API handling
