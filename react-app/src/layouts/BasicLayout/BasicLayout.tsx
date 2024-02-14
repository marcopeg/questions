import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
  cloneElement
} from "react";

import { Toolbar, Box, Stack, List, ListSubheader } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import ErrorBoundary from "../../utils/ErrorBoundary";
import { isFullScreen, IOS_SPACING_BOTTOM } from "../../utils/is-fullscreen";
import useBrowser from "../../utils/use-browser";
import Drawer from "./Drawer";
import AppBarDesktop from "./AppBarDesktop";
import AppBarMobile, { AppBarActionType } from "./AppBarMobile";

interface BasicLayoutProps {
  icon?: React.ReactElement;
  title: string;
  subtitle: string;
  drawerContents?: React.ReactElement[];
  drawerUtils?: React.ReactElement[];
  mobileUtils?: AppBarActionType[];
  children?: ReactNode;
}

interface BasicLayoutContextProps {
  showDetails: boolean;
  toggleCollapsed: () => void;
}

const BasicLayoutContext = createContext<BasicLayoutContextProps>(
  {} as BasicLayoutContextProps
);

export const BasicLayout: FC<BasicLayoutProps> = ({
  icon,
  title,
  subtitle,
  children,
  drawerContents = [],
  drawerUtils = [],
  mobileUtils = []
}) => {
  const { isMobile, isDesktop, sidebarFull, sidebarCompact } = useBrowser();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const showDetails = isMobile ? true : !collapsed;

  // Restore drawer collapsed state from LocalStorage:
  useEffect(() => {
    const value = localStorage.getItem("drawer-collapsed");
    if (value !== null) setCollapsed(value === "true" ? true : false);
  }, []);

  // Save & persist collapsed state:
  const toggleCollapsed = () => {
    localStorage.setItem("drawer-collapsed", !collapsed ? "true" : "false");
    setCollapsed(!collapsed);
  };

  return (
    <BasicLayoutContext.Provider
      value={{
        showDetails,
        toggleCollapsed
      }}
    >
      <Box sx={{ display: "flex" }}>
        {isMobile ? (
          <AppBarMobile
            options={[
              ...mobileUtils,
              {
                icon: <MenuIcon />,
                text: "menu",
                onClick: () => setOpen(true)
              }
            ]}
          />
        ) : (
          <AppBarDesktop icon={icon} title={title} subtitle={subtitle} />
        )}
        <Drawer
          width={collapsed ? sidebarCompact : sidebarFull}
          open={open}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          onClose={() => setOpen(false)}
        >
          <ErrorBoundary>
            <Stack justifyContent="space-between" flexGrow={1}>
              <Box>
                {drawerContents.map((item, key) => cloneElement(item, { key }))}
              </Box>
              {drawerUtils.length > 0 && (
                <List
                  subheader={
                    showDetails && <ListSubheader>Utilities:</ListSubheader>
                  }
                >
                  {drawerUtils.map((item, key) => cloneElement(item, { key }))}
                </List>
              )}
            </Stack>
          </ErrorBoundary>
        </Drawer>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%"
          }}
        >
          {isDesktop && <Toolbar />}
          {children}
          {isFullScreen() && <Box sx={{ minHeight: IOS_SPACING_BOTTOM }} />}
          {isMobile && <Toolbar />}
        </Box>
      </Box>
    </BasicLayoutContext.Provider>
  );
};

export const useBasicLayout = () => useContext(BasicLayoutContext);

export default BasicLayout;
