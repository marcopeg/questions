import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface PageBodyProps {
  theme?: Theme;
  scrollable?: string;
  spacing: number;
}

const PageBody = styled(Box)<PageBodyProps>(
  ({ theme, spacing = 0, scrollable = "true" }) => ({
    display: "flex",
    flexDirection: "column",
    overflow: scrollable === "true" ? "auto" : "inherit",
    marginLeft: theme.spacing(spacing),
    marginRight: theme.spacing(spacing),
    minHeight: `calc(100vh - 110px - ${theme.spacing(
      spacing
    )} - ${theme.spacing(spacing)})`
    // backgroundColor: scrollable === "true" ? "#666" : "inherit"
  })
);

export default PageBody;
