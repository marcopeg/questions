import React from "react";
import { RouteProps } from "react-router-dom";

import AppEntrypoint, { BackofficeIcon } from "./containers/AppEntrypoint";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";

import withApollo from "./state/with-apollo";
import loadable from "./utils/loadable";
import { DrawerMenu } from "./layouts/BasicLayout";

const Dashboard = loadable(() => import("./views-backoffice/Dashboard"));
const TestsList = loadable(() => import("./views-backoffice/TestsList"));
const TestImport = loadable(() => import("./views-backoffice/TestImport"));

import TestView from "./views/TestView";

const menuItems = [
  {
    link: "dashboard",
    text: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    link: "tests",
    text: "Tests",
    icon: <SchoolIcon />
  }
];

const AppBackoffice: React.FC = () => (
  <AppEntrypoint
    icon={<BackofficeIcon />}
    title={"Backoffice"}
    defaultRoute="dashboard"
    drawerContents={[<DrawerMenu title="Backoffice:" items={menuItems} />]}
    mobileUtils={[
      { link: "dashboard", text: "dashboard", icon: <DashboardIcon /> },
      {
        link: "tests",
        text: "tests",
        icon: <SchoolIcon />
      }
    ]}
    routes={
      [
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "tests",
          element: <TestsList />,
          children: [
            {
              path: "import/:id?",
              element: <TestImport />
            }
          ]
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
  />
);

export default withApollo(AppBackoffice, {
  configClient: {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only"
      },
      query: {
        fetchPolicy: "network-only"
      }
    }
  }
});
