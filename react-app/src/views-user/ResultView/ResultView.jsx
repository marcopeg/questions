import { Typography, Stack, Icon, ListItem } from "@mui/material";

import BasicPage, {
  BasicPageList,
  BasicPageSection
} from "../../layouts/BasicPage";
import DateDay from "../../components/DateDay";
import CircularProgress from "../../components/CircularProgress";

import { useResultView } from "./use-result-view";
import { Question } from "./Question";

export const ResultView = () => {
  const { loading, data } = useResultView();
  if (loading) return;

  return (
    <BasicPage
      fullpage
      title={data.test.name}
      subtitle={<DateDay date={new Date(data.created_at)} />}
      backTo={`/results`}
      actions={[<CircularProgress key={"progress"} value={data.score} />]}
    >
      <BasicPageSection withBorder>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Icon sx={{ color: (theme) => theme.palette.text.secondary }}>
            {data.test.icon}
          </Icon>
          <Typography>{data.test.description}</Typography>
        </Stack>
      </BasicPageSection>
      <BasicPageList forContent sx={{ pl: 5, pr: 5 }}>
        {data.results.map((item, index) => (
          <ListItem key={index}>
            <Question item={item} data={data} />
          </ListItem>
        ))}
      </BasicPageList>
    </BasicPage>
  );
};
