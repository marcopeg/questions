import React, { FC, ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Divider,
  IconButton,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";

import useBrowser from "../../utils/use-browser";
import isReactNode from "../../utils/is-react-node";
import { useScrollListener } from "./use-scroll";

type BackToHandler = (event: React.MouseEvent) => void;

type IconAction = {
  icon: ReactNode;
  label: string;
  onClick?: Function;
  linkTo?: string;
  sx?: object;
};

export type TitleBarAction = IconAction | ReactNode;

export interface TitleBarProps {
  id?: Number | String;
  title?: string;
  subtitle?: string;
  backTo?: string | BackToHandler | ReactNode;
  actions?: TitleBarAction[];
}

const TitleBar: FC<TitleBarProps> = ({
  id,
  title,
  subtitle,
  backTo,
  actions
}) => {
  const { theme, isMobile } = useBrowser();
  const scroll = useScrollListener(String(id), { evtName: "scrolling" });

  if (!title && !subtitle) return;

  return (
    <AppBar
      position={isMobile ? "sticky" : "static"}
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.getContrastText(theme.palette.background.default)
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Toolbar
          style={{
            ...(isMobile
              ? {}
              : {
                  height: "56px",
                  minHeight: "56px"
                })
          }}
        >
          {backTo && typeof backTo === "string" && (
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              sx={{ mr: 1 }}
              to={backTo}
            >
              <ChevronLeft />
            </IconButton>
          )}
          {backTo && typeof backTo === "function" && (
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 1 }}
              onClick={backTo}
            >
              <ChevronLeft />
            </IconButton>
          )}
          {backTo && typeof backTo === "object" && backTo}
          <Stack flexGrow={1}>
            {typeof title === "string" ? (
              <Typography variant="h3">{title}</Typography>
            ) : (
              title
            )}
            {typeof subtitle === "string" ? (
              <Typography variant="caption">{subtitle}</Typography>
            ) : (
              subtitle
            )}
          </Stack>
          {actions && (
            <Stack direction={"row"} spacing={0} justifyContent={"flex-end"}>
              {actions.map(($: any, key) =>
                isReactNode($) ? (
                  $
                ) : $.onClick ? (
                  <IconButton key={key} onClick={$.onClick} sx={$.sx || {}}>
                    {$.icon}
                  </IconButton>
                ) : (
                  <IconButton
                    key={key}
                    to={$.linkTo}
                    component={Link}
                    sx={$.sx || {}}
                  >
                    {$.icon}
                  </IconButton>
                )
              )}
            </Stack>
          )}
        </Toolbar>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            border: `${Math.floor(scroll * 100) ? 1 : 0}px solid red`,
            borderColor: (theme) => theme.palette.primary[theme.palette.mode],
            width: `${scroll * 100}%`
          }}
        ></Box>
        <Divider />
      </Box>
    </AppBar>
  );
};

export default TitleBar;
