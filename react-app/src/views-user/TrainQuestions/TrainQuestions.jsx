import {
  BasicPageDrawer
} from "../../layouts/BasicPage";

import { useDrawer } from "./use-drawer";
import { QuestionsForm } from "./QuestionsForm";
import { useTrainQuestions } from "./use-train-questions";

export const TrainQuestions = () => {
  const { open, handleClose } = useDrawer();
  const { title, subtitle, ...form } = useTrainQuestions();

  const props = {
    open,
    handleClose,
    title,
    subtitle,
    children: <QuestionsForm {...form} />
  };

  return <BasicPageDrawer {...props} />;
};
