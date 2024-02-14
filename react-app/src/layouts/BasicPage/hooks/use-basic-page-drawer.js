/**
 * This hook is thought to be used in the BasicPage layout Outlet
 * that is connected to a portion of URL.
 *
 * The handleClose will close the drawer and navigate to the given URL.
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useBasicPageDrawer = (to) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const _timer = useRef(null);

  useEffect(() => {
    _timer.current = setTimeout(() => {
      setOpen(true);
    });
    return () => clearTimeout(_timer.current);
  }, []);

  return {
    open,
    handleClose: () => {
      setOpen(false);
      _timer.current = setTimeout(() => navigate(to), 300);
    }
  };
};
