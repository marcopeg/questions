import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Icon
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import BasicPage, { BasicPageList } from "../../layouts/BasicPage";
import DateDay from "../../components/DateDay";
import CircularProgress from "../../components/CircularProgress";

import { useResultsList } from "./use-results-list";

export const ResultsList = () => {
  const { items } = useResultsList();

  return (
    <BasicPage fullpage title="Tests Results">
      <BasicPageList>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton component={Link} to={`/results/${item.id}`}>
              <Icon
                children={item.test.icon}
                sx={{ mr: 2, color: (theme) => theme.palette.text.secondary }}
              />
              <ListItemText
                primary={item.test.name}
                secondary={<DateDay date={new Date(item.created_at)} />}
              />
              <CircularProgress value={item.score} />
              <IconButton edge="end" aria-label="chevron">
                <ChevronRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </BasicPageList>
    </BasicPage>
  );
};
