import React, { useState, useImperativeHandle, forwardRef } from "react";
import MUIDrawer from "@mui/material/Drawer";

import BasicPage from "../../layouts/BasicPage";

export {
  BasicPageSection as DrawerSection,
  BasicPageList as DrawerList
} from "../../layouts/BasicPage";

const drawerStyle = {
  width: "100%"
};

export const Drawer = forwardRef(({ children, title, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Expose open function to parent via ref
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    }
  }));

  return (
    <MUIDrawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{ style: drawerStyle }}
      {...props}
    >
      <BasicPage title={title} backTo={() => setIsOpen(false)}>
        {children}
      </BasicPage>
    </MUIDrawer>
  );
});

export const openDrawer = (ref) => ({
  onClick: (e) => {
    e.preventDefault();
    ref.current.open();
  }
});
