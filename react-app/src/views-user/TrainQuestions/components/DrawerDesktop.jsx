import React from "react";
import { Drawer, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import BasicPage from "../../../layouts/BasicPage";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    // Responsive maxWidth based on breakpoints
    maxWidth: "80vw",
    left: "10vw",
    [theme.breakpoints.up("md")]: {
      maxWidth: "70vw",
      left: "15vw"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "60vw",
      left: "20vw"
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "40vw",
      left: "30vw"
    }
  }
}));

export const DrawerDesktop = ({
  children,
  title,
  subtitle,
  handleClose,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledDrawer
      {...props}
      theme={theme}
      anchor={"bottom"}
      onClose={handleClose}
    >
      <BasicPage
        standalone
        height={"90vh"}
        title={title}
        subtitle={subtitle}
        actions={[
          {
            icon: <CloseIcon />,
            onClick: handleClose
          }
        ]}
      >
        {children}
      </BasicPage>
    </StyledDrawer>
  );
};
