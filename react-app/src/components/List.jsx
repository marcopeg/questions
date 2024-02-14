import { Link } from "react-router-dom";
import {
  List as MUIList,
  ListItem as MUIListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useBrowser from "../utils/use-browser";
export { ListItemButton, ListItemText, ListItemIcon } from "@mui/material";

export const List = ({ children, sx, ...props }) => {
  const { isDesktop } = useBrowser();

  return (
    <MUIList
      {...props}
      sx={{ ml: isDesktop ? -3 : null, mr: isDesktop ? -3 : null, ...sx }}
    >
      {children}
    </MUIList>
  );
};

export const ListItem = ({ children, linkTo, actionMargin = 2, ...props }) => {
  const body = linkTo ? (
    <ListItemButton component={Link} to={linkTo}>
      {typeof children === "string" ? (
        <ListItemText primary={children} />
      ) : (
        children
      )}
      <ChevronRightIcon color="action" sx={{ ml: actionMargin }} />
    </ListItemButton>
  ) : (
    children
  );

  return (
    <MUIListItem {...props} disablePadding>
      {body}
    </MUIListItem>
  );
};
