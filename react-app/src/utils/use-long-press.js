import { useRef } from "react";

export const useLongPress = ({
  delay = 400,
  handleShort = () => {},
  handleLong = () => {}
} = {}) => {
  const pressStart = useRef(null);
  const pressTimer = useRef(null);

  const handleTouchStart = (e) => {
    e.stopPropagation();

    pressStart.current = Date.now();
    pressTimer.current = setTimeout(() => {
      handleLong(e);
    }, delay);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (pressTimer.current === null) return;
    clearTimeout(pressTimer.current);

    if (Date.now() - pressStart.current < delay) {
      handleShort(e);
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd
  };
};

export default useLongPress;
