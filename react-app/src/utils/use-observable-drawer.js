import { useState, useEffect, useRef } from "react";

import { useEmitted } from "../state/with-emitter";

export const useObservableDrawer = (key) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useEmitted(key);
  const timerRef = useRef();

  useEffect(() => {
    if (data === null) return;
    setOpen(true);
    clearTimeout(timerRef.current);
  }, [data]);

  const close = () => {
    setOpen(false);
    timerRef.current = setTimeout(() => setData(null), 300);
  };

  return { open, close, data };
};
