import { useState, useEffect } from "react";
import { useEmitter } from "./with-emitter";

const DEFAULTS = {};

const STORAGE_KEY = "babelify.onboarding";

const getJSON = (key, fallback = {}) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const setJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const useOnboarding = () => {
  const [data, setData] = useState(getJSON(STORAGE_KEY, DEFAULTS));
  const emitter = useEmitter();

  useEffect(() => emitter.sub("onboarding::data", setData), []);

  return {
    ...data,
    check: (key) => {
      const _data = { ...data, [key]: true };
      setJSON(STORAGE_KEY, _data);
      emitter.pub("onboarding::data", _data);
    }
  };
};
