import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface PageWrapperProps {
  theme?: Theme;
  ismobile: string;
  scrollable: string;
  spacing: number;
  fullpage?: string;
}

const PageWrapper = styled(Paper)<PageWrapperProps>(
  ({ theme, fullpage = "false", ismobile, scrollable, spacing }) => ({
    background: "blue",
    borderRadius: 0,
    // display: "flex",
    // flex: 1,
    flexGrow: 1,
    // flexDirection: "column",
    // background: theme.palette.background.default,
    // color: theme.palette.getContrastText(theme.palette.background.default),
    // ...(ismobile === "true"
    //   ? scrollable
    //     ? {
    //         flexGrow: 1,
    //         height: `calc(100vh - 164px - ${theme.spacing(
    //           spacing
    //         )} - ${theme.spacing(spacing)})`
    //       }
    //     : {}
    //   : {
    //       ...(fullpage === "true" ? { flexGrow: 1 } : {}),
    //       height: `calc(100vh - 164px - ${theme.spacing(
    //         spacing
    //       )} - ${theme.spacing(spacing)})`
    //     })
    // marginTop: spacing ? theme.spacing(spacing) : 0,
    // marginBottom: spacing ? theme.spacing(spacing) : 0
  })
);

export default PageWrapper;
