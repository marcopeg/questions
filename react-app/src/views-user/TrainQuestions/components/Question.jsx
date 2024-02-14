import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  FormHelperText
} from "@mui/material";

export const Question = ({ question, form }) => {
  const id = question._fieldId;
  const hasError = form.hasError(id);
  const error = form.getError(id);

  return (
    <Box>
      <FormControl component="fieldset" margin="normal" error={hasError}>
        <FormLabel component="legend">{question.text}</FormLabel>
        {hasError && <FormHelperText sx={{ ml: 0 }}>{error}</FormHelperText>}
        <RadioGroup
          aria-label={`question-${id}`}
          name={`question-${id}`}
          {...form.getBinding(question._fieldId)}
        >
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              value={answer.id}
              control={<Radio />}
              label={answer.text}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
