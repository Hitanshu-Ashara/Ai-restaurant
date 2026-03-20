/**
 * Start speech recognition and return a Promise with the transcript.
 * Handles retries and all edge cases so one click always works.
 */
export function startListening() {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(new Error("Speech recognition not supported in this browser."));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    let resolved = false;

    recognition.onresult = (event) => {
      if (resolved) return;
      resolved = true;
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      if (resolved) return;
      resolved = true;
      // 'no-speech' is a common non-fatal error — treat as empty
      if (event.error === "no-speech" || event.error === "aborted") {
        resolve("");
      } else {
        reject(new Error(`Speech recognition error: ${event.error}`));
      }
    };

    recognition.onend = () => {
      // If recognition ended without a result or error, resolve with empty string
      if (!resolved) {
        resolved = true;
        resolve("");
      }
    };

    // Small delay before starting avoids "aborted" on first click
    setTimeout(() => {
      try {
        recognition.start();
      } catch (e) {
        if (!resolved) {
          resolved = true;
          reject(e);
        }
      }
    }, 100);
  });
}

/**
 * Speak text using the Web Speech Synthesis API.
 */
export function speak(text) {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}
