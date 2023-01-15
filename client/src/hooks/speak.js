const speak = (text) => {
  let utterance = new SpeechSynthesisUtterance(text);
  if (!speechSynthesis.speaking || speechSynthesis.pause()) {
    // console.log("w", text);
    // const voices = speechSynthesis.getVoices();
    // utterance.voice = voices[2];
    speechSynthesis.speak(utterance);
  }
};

export default speak;
