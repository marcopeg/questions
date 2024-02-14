import { useNavigate, Link, Outlet } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import BasicPage, { BasicPageList } from "../../layouts/BasicPage";
import { useTestsList } from "./use-tests-list";

export const TestsList = () => {
  const navigate = useNavigate();
  const { items, handleDelete } = useTestsList();

  return (
    <>
      <BasicPage
        fullpage
        title="Tests"
        actions={[
          {
            icon: <Icon>add</Icon>,
            onClick: () => navigate("/tests/import")
          }
        ]}
      >
        <BasicPageList>
          {items.length === 0 && (
            <Button
              fullWidth
              variant="link"
              sx={{ mt: 2 }}
              component={Link}
              to={"/tests/import"}
            >
              No tests found, create the first one!
            </Button>
          )}
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
                <IconButton onClick={handleDelete(item)}>
                  <Icon>delete</Icon>
                </IconButton>
                <IconButton component={Link} to={`/tests/import/${item.id}`}>
                  <Icon>edit</Icon>
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </BasicPageList>
      </BasicPage>
      <Outlet />
    </>
  );
};
