document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const sourceLang = document.getElementById('source-lang');
    const targetLang = document.getElementById('target-lang');
    const translateBtn = document.getElementById('translate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const charCount = document.getElementById('char-count');
    const swapBtn = document.getElementById('swap-btn');
    const copyBtn = document.getElementById('copy-btn');

    // --- Dark Mode Logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- Character Count ---
    inputText.addEventListener('input', () => {
        const len = inputText.value.length;
        charCount.textContent = `${len}/500`;
        if (len > 500) {
            inputText.value = inputText.value.substring(0, 500);
            charCount.textContent = '500/500';
        }
    });

    // --- Translation Logic ---
    translateBtn.addEventListener('click', async () => {
        const text = inputText.value.trim();
        if (!text) return;

        translateBtn.innerText = 'Translating...';
        translateBtn.disabled = true;

        try {
            const response = await fetch('/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    source: sourceLang.value,
                    target: targetLang.value
                })
            });

            const data = await response.json();
            if (data.error) {
                outputText.value = "Error: " + data.error;
            } else {
                outputText.value = data.translated_text;
            }
        } catch (err) {
            outputText.value = "Network Error. Please try again.";
        } finally {
            translateBtn.innerText = 'Translate Now';
            translateBtn.disabled = false;
        }
    });

    // --- Swap Languages ---
    swapBtn.addEventListener('click', () => {
        const temp = sourceLang.value;
        sourceLang.value = targetLang.value;
        targetLang.value = temp;

        // Also swap text if there is any
        const tempText = inputText.value;
        inputText.value = outputText.value;
        outputText.value = tempText;
    });

    // --- Copy to Clipboard ---
    copyBtn.addEventListener('click', () => {
        if (outputText.value) {
            navigator.clipboard.writeText(outputText.value);
            alert("Translation copied!");
        }
    });
});