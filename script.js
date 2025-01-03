// 🌟 JavaScript Section
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const downloadButton = document.getElementById('downloadButton');
const clearButton = document.getElementById('clearButton');
const voiceSelect = document.getElementById('voiceSelect');
const rateControl = document.getElementById('rateControl');
const pitchControl = document.getElementById('pitchControl');
const wordCountDisplay = document.getElementById('wordCount');

// Populate Voice List
function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
speechSynthesis.onvoiceschanged = populateVoiceList;

// Update Word Count
function updateWordCount() {
    const text = textInput.value.trim();
    wordCountDisplay.textContent = text ? text.split(/\s+/).length : 0;
}

textInput.addEventListener('input', updateWordCount);

// Speak Text
speakButton.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoiceIndex = voiceSelect.value;
    const voices = speechSynthesis.getVoices();
    if (voices[selectedVoiceIndex]) {
        utterance.voice = voices[selectedVoiceIndex];
    }
    utterance.rate = rateControl.value;
    utterance.pitch = pitchControl.value;
    speechSynthesis.speak(utterance);
});

// Download Text
downloadButton.addEventListener('click', () => {
    const blob = new Blob([textInput.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'text-to-speech.txt';
    link.click();
});

// Clear Text
clearButton.addEventListener('click', () => {
    textInput.value = '';
    updateWordCount();
});
