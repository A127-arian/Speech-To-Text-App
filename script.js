const output = document.getElementById("output");
const startButton = document.getElementById("startButton");
let finalTranscript = "";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Set the continuous property to true for continuous recognition
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;

startButton.addEventListener('click', () => {
    finalTranscript = '';
    output.textContent = '';
    recognition.start();
    startButton.textContent = 'Listening...';
});

recognition.addEventListener('result', (e) => {
    let interimTranscript = "";
    for (let i = e.resultIndex; i < e.results.length; ++i) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
            finalTranscript += transcript + " ";
        } else {
            interimTranscript += transcript;
        }
    }
    output.textContent = finalTranscript + interimTranscript;
});

// Since continuous is true, the recognition will not end automatically.
// The onend event would only be triggered by manually calling recognition.stop() or recognition.abort().
recognition.addEventListener('end', () => {
    // We don't need to restart here since recognition.continuous = true
    // However, if the recognition service times out or has an error, you might restart it here.
    // For now, this will simply change the button text when manually stopped.
    startButton.textContent = 'Start Listening';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        recognition.stop();
        startButton.textContent = 'Start Listening';
    }
});
