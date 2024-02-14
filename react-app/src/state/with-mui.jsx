import { useState, createContext, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeSwitcher = createContext();

export const withMui =
  (Component, { startWith = "auto", ...avaliableThemes } = {}) =>
  (props) => {
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [currentTheme, setCurrentTheme] = useState(null);

    const setTheme = (to) => {
      setCurrentTheme(to);
      // switch apple
      const statusBarMeta = document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      );
      if (statusBarMeta) {
        statusBarMeta.setAttribute(
          "content",
          to === "dark" ? "black-translucent" : "default"
        );
      }
    };

    // Load initial theme:
    useEffect(() => {
      if (startWith === "auto" && localStorage.getItem("babelify.mui.theme")) {
        setTheme(localStorage.getItem("babelify.mui.theme"));
        return;
      }

      if (startWith === "auto") {
        setTheme(isDarkMode ? "dark" : "light");
        return;
      }

      setTheme(startWith);
    }, []);

    // Prevent rendering without a theme:
    if (!currentTheme) return null;

    const switchTheme = (to) => {
      localStorage.setItem("babelify.mui.theme", to);
      setTheme(to);
    };

    return (
      <ThemeSwitcher.Provider
        value={{ avaliableThemes, currentTheme, switchTheme }}
      >
        <ThemeProvider theme={createTheme(avaliableThemes[currentTheme])}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </ThemeSwitcher.Provider>
    );
  };

export const useThemeSwitcher = () => useContext(ThemeSwitcher);

export default withMui;
