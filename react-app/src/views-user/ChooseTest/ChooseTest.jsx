import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Icon,
  Stack,
  Typography
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useChooseTest } from "./use-choose-test";
import BasicPage, { BasicPageList } from "../../layouts/BasicPage";
import CircularProgress from "../../components/CircularProgress";
import { useBrowser } from "../../utils";

export const ChooseTest = () => {
  const { isDesktop } = useBrowser();
  const { items } = useChooseTest();

  return (
    <BasicPage fullpage title="ChooseTest">
      <BasicPageList>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton component={Link} to={`/train/${item.id}`}>
              <Icon
                children={item.icon}
                sx={{ mr: 2, color: (theme) => theme.palette.text.secondary }}
              />
              <ListItemText
                primary={item.name}
                secondary={isDesktop ? item.description : null}
              />
              {item.stats?.tot_results ? (
                <Stack sx={{ ml: 2, mr: 2 }} spacing={2} direction={"row"}>
                  {isDesktop && (
                    <Stack sx={{ width: 50 }}>
                      <Typography variant="caption" color="textSecondary">
                        {item.stats?.tot_results} results
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.stats?.avg_score}% avg
                      </Typography>
                    </Stack>
                  )}
                  <CircularProgress value={item.stats?.completion || 0} />
                </Stack>
              ) : (
                <Typography variant="h6" color="primary" sx={{ mr: 2 }}>
                  NEW!
                </Typography>
              )}
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
