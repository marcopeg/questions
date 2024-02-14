import { useBrowser } from "../../utils";

import { QuestionsForm } from "./QuestionsForm";
import { useTrainPopover } from "./use-train-popover";
import { useTrainQuestions } from "./use-train-questions";

import { DrawerDesktop } from "./components/DrawerDesktop";
import { DrawerMobile } from "./components/DrawerMobile";

export const TrainQuestions = () => {
  const { isMobile } = useBrowser();
  const { open, handleClose } = useTrainPopover();
  const { title, subtitle, ...form } = useTrainQuestions();

  const props = {
    open,
    handleClose,
    title,
    subtitle,
    children: <QuestionsForm {...form} />
  };

  return isMobile ? <DrawerMobile {...props} /> : <DrawerDesktop {...props} />;
};
