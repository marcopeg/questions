import { createContext, useContext, useState, useEffect } from "react";

const EmitterContext = createContext();

class Emitter {
  constructor() {
    this.listeners = {};
    this.values = {};
  }

  sub(channel, fn) {
    // Upsert the channel
    if (!this.listeners[channel]) {
      this.listeners[channel] = [];
    }

    // Subscribe
    const _channel = this.listeners[channel];
    _channel.push(fn);
    return () => _channel.splice(_channel.indexOf(fn), 1);
  }

  pub(channel, value, ...args) {
    // Store last value
    this.values[channel] = value;

    // Emit the signal
    const _channel = this.listeners[channel];
    if (!_channel) return;
    _channel.forEach((fn) => fn(value, ...args));
  }

  get(channel, defaultValue) {
    return this.values[channel] || defaultValue;
  }
}

export const withEmitter = (Component) => (props) => {
  return (
    <EmitterContext.Provider value={new Emitter()}>
      <Component {...props} />
    </EmitterContext.Provider>
  );
};

export const useEmitter = () => useContext(EmitterContext);

// This is also a global useState kind of thing
// different states keeps in sync through the emitter
export const useEmitted = (key, initialValue = null) => {
  const emitter = useEmitter();
  const [value, setValue] = useState(emitter.get(key, initialValue));
  useEffect(() => emitter.sub(key, setValue));
  return [value, (newVal) => emitter.pub(key, newVal)];
};

export const useSubscribe = (key, fn = () => {}) => {
  const emitter = useEmitter();
  useEffect(() => emitter.sub(key, fn));
};

export default withEmitter;
