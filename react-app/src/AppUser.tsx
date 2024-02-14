import React from "react";
import { RouteProps } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import GradingIcon from "@mui/icons-material/Grading";

import loadable from "./utils/loadable";
import { DrawerMenu } from "./layouts/BasicLayout";
import AppEntrypoint, { UserIcon } from "./containers/AppEntrypoint";

const ChooseTest = loadable(() => import("./views-user/ChooseTest"));
const TrainSetup = loadable(() => import("./views-user/TrainSetup"));
const TrainQuestions = loadable(() => import("./views-user/TrainQuestions"));
const ResultsList = loadable(() => import("./views-user/ResultsList"));
const ResultView = loadable(() => import("./views-user/ResultView"));

import TestView from "./views/TestView";

const menuItems = [
  {
    link: "/",
    text: "Choose a Test",
    icon: <QuizIcon />
  },
  {
    link: "/results",
    text: "Results",
    icon: <GradingIcon />
  }
];

const AppUser: React.FC = () => {
  return (
    <AppEntrypoint
      icon={<UserIcon />}
      title={"User"}
      drawerContents={[<DrawerMenu title="Backoffice:" items={menuItems} />]}
      mobileUtils={[
        { link: "/", text: "Choose Tests", icon: <QuizIcon /> },
        { link: "/results", text: "Results", icon: <GradingIcon /> }
      ]}
      routes={
        [
          {
            path: "/",
            element: <ChooseTest />
          },
          {
            path: "/train/:id",
            element: <TrainSetup />,
            children: [
              {
                path: ":settings",
                element: <TrainQuestions />
              }
            ]
          },
          {
            path: "/results",
            element: <ResultsList />
          },
          {
            path: "/results/:id",
            element: <ResultView />
          },
          {
            path: "test",
            element: <TestView.Outside />,
            children: [
              {
                path: "",
                element: <TestView.Inside />
              }
            ]
          }
        ] as RouteProps[]
      }
      // contentAfter={
      //   <>
      //     <TrainSetup />
      //     <Questions />
      //   </>
      // }
    />
  );
};

export default AppUser;
