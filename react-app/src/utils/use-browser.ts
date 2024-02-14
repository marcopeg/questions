import { useTheme, useMediaQuery, Theme } from "@mui/material";

type Breakpoint = {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
};

interface BrowserData {
  theme: Theme;
  isMobile: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  isMobileDevice: boolean;
  isDesktopDevice: boolean;
  sidebarFull: number;
  sidebarCompact: number;
  breakpoints: Breakpoint;
}

export const useBrowser = (): BrowserData => {
  const theme = useTheme();

  const breakpoints = {
    isSm: useMediaQuery(theme.breakpoints.down("sm")),
    isMd: useMediaQuery(theme.breakpoints.down("md")),
    isLg: useMediaQuery(theme.breakpoints.down("lg")),
    isXl: useMediaQuery(theme.breakpoints.down("xl"))
  };

  const isMobile = breakpoints.isMd;
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const userAgent = window.navigator.userAgent.toLowerCase();
  const mobileDevices =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/;
  const isMobileDevice = mobileDevices.test(userAgent);

  return {
    theme,
    isMobile,
    isDesktop: !isMobile,
    isLandscape,
    isPortrait: !isLandscape,
    isMobileDevice,
    isDesktopDevice: !isMobileDevice,
    sidebarFull: 250,
    sidebarCompact: 70,
    breakpoints
  };
};

export default useBrowser;
