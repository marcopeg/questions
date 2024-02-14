import { useEffect, useRef } from "react";
import { useEmitter, useEmitted } from "../../state/with-emitter";

export const useScrollCallback = (
  handlerFn,
  {
    evtName = "scroll",
    debounce = 250,
    precision = 0.001,
    targetRef,
    id = String(Math.random())
  } = {}
) => {
  const emitter = useEmitter();
  const debounceRef = useRef(null);
  const positionRef = useRef(0);
  const propagate = useRef(true);

  const handleScroll = () => {
    if (!targetRef.current) return;
    if (!handlerFn) return;

    const scrollTop = targetRef.current.scrollTop;
    const scrollHeight = targetRef.current.scrollHeight;
    const clientHeight = targetRef.current.clientHeight;
    const newValue = scrollTop / (scrollHeight - clientHeight);

    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (Math.abs(newValue - positionRef.current) > precision) {
        positionRef.current = newValue;

        if (propagate.current) {
          handlerFn(newValue);
          emitter.pub(`basic-page:${evtName}:${id}`, newValue);
        }

        propagate.current = true;
      }
    }, debounce);
  };

  const scrollTo = (
    value,
    { smooth = false, stopPropagation = false } = {}
  ) => {
    if (positionRef.current === value) return;

    const scrollHeight = targetRef.current.scrollHeight;
    const clientHeight = targetRef.current.clientHeight;
    const newScroll = value * (scrollHeight - clientHeight);

    // Disable event propagation for this activity
    if (stopPropagation) {
      propagate.current = false;
    }

    targetRef.current.scrollTo({
      top: newScroll,
      behavior: smooth ? "smooth" : "auto"
    });
  };

  useEffect(() => {
    if (!handlerFn) return;

    if (targetRef.current !== null) {
      targetRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (targetRef.current !== null) {
        targetRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [id]);

  return { scrollTo };
};

export const useScrollListener = (
  id = "unknown",
  { evtName = "scroll" } = {}
) => {
  const [value] = useEmitted(`basic-page:${evtName}:${id}`, 0);
  return value;
};
