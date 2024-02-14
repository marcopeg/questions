// https://github.com/MikeyParton/react-speech-kit/blob/master/src/useSpeechSynthesis.jsx
import { useEffect, useState } from "react";

export const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return voiceOptions;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setTimeout(getVoices); // Fix to get voices on computer
    }
  }, []);

  const speak = (args = {}) => {
    const { voice = null, text = "", rate = 1, pitch = 1, volume = 1 } = args;

    try {
      setSpeaking(true);
      const utterance = new window.SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.voice = voice;
      utterance.onend = handleEnd;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  const cancel = () => {
    try {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } catch {}
  };

  return {
    supported: typeof window !== "undefined" && window.speechSynthesis,
    speak,
    speaking,
    cancel,
    voices,
    getVoices
  };
};
