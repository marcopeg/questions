import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Drawer } from "@mui/material";

export const Inside = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const lineId = searchParams.get("line");

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (lineId) {
      setOpen(true);
    }
  }, [lineId]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchParams({ line: "" });
      });
    }

    return () => clearTimeout(timerRef.current);
  }, [open]);

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      {lineId}
    </Drawer>
  );
};
