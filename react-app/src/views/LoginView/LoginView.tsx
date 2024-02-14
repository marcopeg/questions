import React from "react";

import { Typography, List, ListItem, ListItemButton } from "@mui/material";

import { removeLoadable, useLogin } from "../../state";
import CenteredLayout from "../../layouts/CenteredLayout";

const LoginView = () => {
  const { accounts, select } = useLogin();

  return (
    <CenteredLayout>
      <Typography variant="h1">Questions</Typography>
      <List sx={{}}>
        {accounts.map((account) => (
          <ListItem key={account.name}>
            <ListItemButton>
              <Typography variant="h3" onClick={select(account)}>
                {account.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </CenteredLayout>
  );
};

export default removeLoadable(LoginView);
