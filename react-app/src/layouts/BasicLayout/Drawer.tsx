import React, { FC } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { isFullScreen, IOS_SPACING_BOTTOM } from "../../utils/is-fullscreen";
import useBrowser from "../../utils/use-browser";
import DesktopDrawer from "./styled/DesktopDrawer";
import MobileDrawer from "./styled/MobileDrawer";
import CollapsibleToolbar from "./styled/CollapsibleToolbar";

interface DrawerProps {
  children: React.ReactNode;
  width: number;
  collapsed: boolean;
  toggleCollapsed: () => void;
  // Why those MUIDrawer props are not properly bubbled out by Typescript?
  open: boolean;
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({
  children,
  width,
  collapsed,
  toggleCollapsed,
  ...props
}) => {
  const { isDesktop } = useBrowser();
  const CustomDrawer = isDesktop ? DesktopDrawer : MobileDrawer;

  return (
    <CustomDrawer
      {...props}
      width={width}
      variant={isDesktop ? "permanent" : "temporary"}
      anchor={isDesktop ? "left" : "right"}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "auto"
        }}
      >
        {children}
      </Box>
      {isDesktop && (
        <CollapsibleToolbar>
          <IconButton onClick={toggleCollapsed}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </CollapsibleToolbar>
      )}
      {isFullScreen() && <Box sx={{ minHeight: IOS_SPACING_BOTTOM }} />}
    </CustomDrawer>
  );
};

export default Drawer;
