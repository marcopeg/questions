import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { green, red } from "@mui/material/colors";

const getColor = (type, theme) =>
  type === "correct"
    ? theme.palette.mode === "light"
      ? green[100]
      : green[800]
    : type === "wrong"
      ? theme.palette.mode === "light"
        ? red[100]
        : red[800]
      : "transparent";

const Answer = ({ text, type, checked }) => (
  <ListItem
    sx={{
      mt: 1,
      borderRadius: 5,
      borderSize: 1,
      borderStyle: "solid",
      borderColor: (theme) => getColor(type, theme)
    }}
  >
    {checked ? (
      <RadioButtonCheckedIcon
        sx={{ color: (theme) => theme.palette.text.secondary }}
      />
    ) : (
      <RadioButtonUncheckedIcon
        sx={{ color: (theme) => theme.palette.text.secondary }}
      />
    )}
    <ListItemText primary={text} sx={{ m: 0, ml: 2, mr: 2 }} />
  </ListItem>
);

export const Question = ({ item, data }) => {
  const question = data.questions[item.question_id];
  const category = data.categories[question.category_id];

  const correctId = question.answers.find(($) => $.is_correct).id;
  const providedId = item.answer_id;
  const isCorrect = correctId === providedId;

  return (
    <Box sx={{ mt: 3, mb: 5 }}>
      <Chip label={category.name} size={"small"} />
      <Typography variant={"h4"}>{question.text}</Typography>
      <List sx={{ ml: 2, mt: 1 }}>
        {question.answers.map((answer) => (
          <Box key={answer.id}>
            {answer.is_correct && answer.id == providedId ? (
              <Answer
                {...answer}
                type={"correct"}
                checked={answer.id === providedId}
              />
            ) : answer.is_correct ? (
              <Answer
                {...answer}
                type={"correct"}
                checked={answer.id === providedId}
              />
            ) : answer.id === providedId ? (
              <Answer
                {...answer}
                type={"wrong"}
                checked={answer.id === providedId}
              />
            ) : (
              <Answer {...answer} checked={answer.id === providedId} />
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};
