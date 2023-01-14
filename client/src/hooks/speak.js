const speak = (text) => {
  let utterance = new SpeechSynthesisUtterance("hello");
  if (!speechSynthesis.speaking || speechSynthesis.pause()) {
    console.log("w", text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[2];
    speechSynthesis.speak(utterance);
  }
  //   return <div>usespeak</div>;
};

export default speak;
