import React, { FC, ReactNode } from "react";
import { Box, AppBar, Toolbar, Divider } from "@mui/material";

import useBrowser from "../../utils/use-browser";

export interface FooterBarProps {
  children: ReactNode;
}

const FooterBar: FC<FooterBarProps> = ({ children }) => {
  const { theme, isMobile } = useBrowser();

  return (
    <AppBar
      position={isMobile ? "sticky" : "static"}
      elevation={0}
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.getContrastText(theme.palette.background.default)
      }}
    >
      <Divider />
      <Toolbar>
        <Box flexGrow={1}>{children}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default FooterBar;
