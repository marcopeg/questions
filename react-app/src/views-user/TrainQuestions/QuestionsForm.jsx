import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Question } from "./components/Question";

import { BasicPageSection } from "../../layouts/BasicPage";
import { SuccessAnimation } from "../../components/SuccessAnimation";

export const QuestionsForm = ({ questions, form, submit }) => {
  const navigate = useNavigate();
  const [wasSent, setWasSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.isValid()) return;
    submit(form.getValues()).then((res) => {
      setWasSent(true);
      setTimeout(() => {
        navigate(`/results/${res.id}`);
      }, 2000);
    });
  };

  if (wasSent) {
    return <SuccessAnimation />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <BasicPageSection key={question.id} withBorder>
          <Question question={question} form={form} />
        </BasicPageSection>
      ))}
      <BasicPageSection>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Send
        </Button>
      </BasicPageSection>
    </form>
  );
};
