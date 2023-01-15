import { useContext } from "react";
import { chatContext } from "../context/ChatContext";
import nobitaOpenSound from "../assets/nobitaOpen.mp3";
import nobitaCloseSound from "../assets/nobitaClose.mp3";

const useSpeech = (handleSubmit) => {
  let res;
  const { setInputValue, setSpeechLoading } = useContext(chatContext);
  window.SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition;

  const recognition = new window.SpeechRecognition();
  recognition.lang = "en-GB";
  recognition.interimResults = true;

  const startSpeak = () => {
    const audio = new Audio(nobitaOpenSound);
    audio.play();
    setSpeechLoading(true);
    recognition.start();
  };

  recognition.addEventListener("result", (e) => {
    res = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    setInputValue(res);
  });
  // recognition.onresult = (e) => {
  //   res = e.results[0][0].transcript;
  //   setInputValue(res);
  // };
  recognition.onspeechend = function (e) {
    new Audio(nobitaCloseSound).play();
    handleSubmit(undefined, undefined, res);
    setSpeechLoading(false);

    recognition.stop();
  };
  recognition.onend = function () {
    setInputValue("");
    setSpeechLoading(false);
    recognition.stop();
  };
  recognition.onerror = function (e) {
    // setSpeechInputValue("Error occurred in recognition: " + e.error);
  };
  return startSpeak;
};

export default useSpeech;
