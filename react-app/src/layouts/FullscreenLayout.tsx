import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

interface FullscreenLayoutProps {
  theme?: Theme;
}

export const FullscreenLayout = styled(Box)<FullscreenLayoutProps>(
  ({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
    zIndex: 1200
  })
);

export default FullscreenLayout;
