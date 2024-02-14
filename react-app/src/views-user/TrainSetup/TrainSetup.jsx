import { Outlet } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Icon,
  Typography
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import BasicPage, {
  BasicPageSection,
  BasicPageList
} from "../../layouts/BasicPage";
import CircularProgress from "../../components/CircularProgress";
import { useBrowser } from "../../utils";

import { useTest } from "./use-test";

export const TrainSetup = () => {
  const { breakpoints } = useBrowser();
  const {
    icon,
    name,
    description,
    categories,
    stats,
    questionsNum,
    setQuestionsNum,
    getAmount,
    setAmount,
    confirmAmounts
  } = useTest();

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAmounts();
  };

  return (
    <>
      <BasicPage
        title={
          <Typography variant={breakpoints.isSm ? "h5" : "h3"}>
            {name}
          </Typography>
        }
        backTo={"/"}
        actions={[{ icon: <DoneIcon />, onClick: confirmAmounts }]}
      >
        <BasicPageSection withBorder>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {icon && <Icon children={icon} />}
            <ListItemText primary={description} />
            {stats && !breakpoints.isSm && (
              <>
                <Stack sx={{ width: 80 }}>
                  <Typography variant="caption" color="textSecondary">
                    {stats?.tot_results} results
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {stats?.avg_score}% avg
                  </Typography>
                </Stack>
                <CircularProgress value={stats?.completion || 0} />
              </>
            )}
          </Stack>
        </BasicPageSection>
        {stats && breakpoints.isSm && (
          <BasicPageSection withBorder>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Stack sx={{ width: 80 }}>
                <Typography variant="caption" color="textSecondary">
                  {stats?.tot_results} results
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {stats?.avg_score}% avg
                </Typography>
              </Stack>
              <CircularProgress value={stats?.completion || 0} />
            </Stack>
          </BasicPageSection>
        )}
        <form onSubmit={handleSubmit}>
          <BasicPageList forContent>
            <ListSubheader>General:</ListSubheader>
            <ListItem key="questions" sx={{}}>
              <ListItemText primary={"Number of questions:"} />
              <TextField
                type="text"
                size="small"
                sx={{ width: 100 }}
                InputProps={{
                  sx: { "& .MuiInputBase-input": { textAlign: "right" } }
                }}
                value={questionsNum}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setQuestionsNum(e);
                  }
                }}
              />
            </ListItem>
            <ListSubheader>Categories Distribution:</ListSubheader>
            {categories.map((category) => (
              <ListItem key={category.id} sx={{ mb: 1 }}>
                <ListItemText primary={category.name} />
                <TextField
                  type="text"
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{
                    sx: { "& .MuiInputBase-input": { textAlign: "right" } },
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    )
                  }}
                  value={getAmount(category.id)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setAmount(category.id)(e);
                    }
                  }}
                />
              </ListItem>
            ))}
            <ListItem sx={{ mt: 4 }}>
              <Button fullWidth variant="contained" type="submit">
                Take the Test
              </Button>
            </ListItem>
          </BasicPageList>
        </form>
      </BasicPage>
      <Outlet />
    </>
  );
};
