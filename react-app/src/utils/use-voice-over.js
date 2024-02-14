import { useState, useEffect } from "react";
import { useSpeechSynthesis } from "./use-speech-synthesis";
import { useSnackbar } from "../state";

const DEFAULT_RATE = 0.8;
const SLOW_RATE = 0;

export const useVoiceOver = (_options = {}) => {
  const synth = useSpeechSynthesis();
  const { enqueueShort } = useSnackbar();
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [isSupported, setIsSupported] = useState(synth.supported);

  // Check if it is disabled
  useEffect(() => {
    // Skip the check if the language is not declared
    if (!_options.lang) return;
    if (!synth.supported) return;

    // Try to find the voice for the language:
    const voice = synth.voices.find(($) => $.lang.includes(_options.lang));
    if (!voice) {
      setIsSupported(false);
    } else {
      setIsSupported(true);
    }
  }, [synth.voices]);

  // Stop on unmount
  useEffect(() => {
    return () => synth.cancel();
  }, []);

  return {
    isPlaying: synth.speaking,
    isSupported,
    stop: () => synth.cancel(),
    reset: () => setRate(SLOW_RATE),
    play: (text, options = {}) => {
      const lang = options.lang || _options.lang;
      const volume = options.volume === undefined ? 1 : options.volume;
      const voice = synth
        .getVoices()
        .filter(($) => $.lang.includes(lang))
        .shift();

      if (voice) {
        synth.speak({ text, voice, rate, volume });
      } else {
        setIsSupported(false);
        enqueueShort(`Language "${lang}" not supported`, { variant: "error" });
      }

      // Alternate default and slow rate:
      setTimeout(() =>
        setRate((v) => (v === DEFAULT_RATE ? SLOW_RATE : DEFAULT_RATE))
      );
    }
  };
};
