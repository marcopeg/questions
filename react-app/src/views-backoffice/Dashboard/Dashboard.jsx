import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Icon,
  Divider,
  Typography
} from "@mui/material";
import BasicPage, { BasicPageList } from "../../layouts/BasicPage";
import CircularProgress from "../../components/CircularProgress";
import DateDay from "../../components/DateDay";
import { useDashboard } from "./use-dashboard";

export const Dashboard = () => {
  const data = useDashboard();

  return (
    <BasicPage fullpage title="Dashboard">
      <BasicPageList forContent>
        <ListItem>
          <ListItemIcon>
            <Icon>{"group"}</Icon>
          </ListItemIcon>
          <ListItemText primary="Total Users" />
          <Typography
            variant="h4"
            color="text.secondary"
            children={data?.tot_users}
          />
        </ListItem>
        <Divider sx={{ ml: -2, mr: -2, mt: 1, mb: 1 }} />
        <ListItem>
          <ListItemIcon>
            <Icon>{"school"}</Icon>
          </ListItemIcon>
          <ListItemText primary="Total Tests" />
          <Typography
            variant="h4"
            color="text.secondary"
            children={data?.tot_tests}
          />
        </ListItem>
        <Divider sx={{ ml: -2, mr: -2, mt: 1, mb: 1 }} />
        <ListItem>
          <ListItemIcon>
            <Icon>{"quiz"}</Icon>
          </ListItemIcon>
          <ListItemText primary="Total Questions" />
          <Typography
            variant="h4"
            color="text.secondary"
            children={data?.tot_questions}
          />
        </ListItem>
        <Divider sx={{ ml: -2, mr: -2, mt: 1, mb: 1 }} />
        <ListItem>
          <ListItemIcon>
            <Icon>{"question_answer"}</Icon>
          </ListItemIcon>
          <ListItemText primary="Total Answers" />
          <Typography
            variant="h4"
            color="text.secondary"
            children={data?.tot_answers}
          />
        </ListItem>
        <Divider sx={{ ml: -2, mr: -2, mt: 1, mb: 1 }} />
        <ListItem>
          <ListItemIcon>
            <Icon>{"sports_score"}</Icon>
          </ListItemIcon>
          <ListItemText primary="Average Score" />
          <CircularProgress value={data?.avg_score} />
        </ListItem>
        <Divider sx={{ ml: -2, mr: -2, mt: 1, mb: 1 }} />
        <ListItem>
          <ListItemIcon>
            <Icon>{"calendar_month"}</Icon>
          </ListItemIcon>
          <ListItemText primary="Last Result" />
          {data && (
            <Typography
              variant="caption"
              color="text.secondary"
              children={<DateDay date={new Date(data?.last_result)} />}
            />
          )}
        </ListItem>
        <Divider sx={{ ml: -2, mr: -2, mt: 1, mb: 1 }} />
      </BasicPageList>
    </BasicPage>
  );
};
