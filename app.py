from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# --- Configuration ---
# MyMemory API is free. You can use it without a key for limited usage.
# To get a free key (increased limits), verify your email at: https://mymemory.translated.net/doc/spec.php
API_URL = "https://api.mymemory.translated.net/get"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text', '')
    source_lang = data.get('source', 'en')
    target_lang = data.get('target', 'es')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Prepare the payload for MyMemory API
    # The pair is formatted as "source_lang|target_lang" (e.g., "en|hi")
    params = {
        'q': text,
        'langpair': f"{source_lang}|{target_lang}"
    }

    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status() # Check for HTTP errors
        result = response.json()
        
        # Extract translated text
        translated_text = result.get('responseData', {}).get('translatedText', '')
        
        # Handle cases where API returns an error in the body
        if result.get('responseStatus') != 200:
             return jsonify({'error': result.get('responseDetails', 'Translation failed')}), 500

        return jsonify({'translated_text': translated_text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)