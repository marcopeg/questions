import React from "react";
import { List } from "@mui/material";

export const BasicPageList = ({ children, forContent = false, ...props }) => {
  const ml = forContent ? 2 : 0;
  const mr = forContent ? 2 : 0;

  return (
    <List
      {...props}
      sx={{
        ml,
        mr,
        "& .MuiListItem-root": {
          p: 0,
          "& .MuiButtonBase-root": {
            ml: 2,
            pr: 2
          },
          "& .MuiButtonBase-root": {
            marginLeft: 0
          }
        },
        "& .MuiListSubheader-root": {
          pl: 0,
          pb: 0,
          pt: 4,
          "&:first-of-type": {
            pt: 0 // Zero padding top for the first ListSubheader
          }
        },

        ...(props.sx || null)
      }}
    >
      {children}
    </List>
  );
};
