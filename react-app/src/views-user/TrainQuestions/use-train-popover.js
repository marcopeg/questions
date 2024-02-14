import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useTrainPopover = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const _timer = useRef(null);

  const handleClose = () => {
    setOpen(false);
    _timer.current = setTimeout(() => {
      navigate(`/train/${id}`);
    }, 300);
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      clearTimeout(_timer.current);
    };
  }, []);

  return {
    open,
    handleClose
  };
};
