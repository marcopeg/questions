import React from "react";
import {
  createBrowserRouter,
  useRouteError,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

export {
  AdminPanelSettings as BackofficeIcon,
  LocalPolice as UserIcon
} from "@mui/icons-material";

import { removeLoadable } from "../../state/with-loadable";
import BasicLayout from "../../layouts/BasicLayout";
import ErrorView from "../../views/ErrorView";

import Route404 from "../../components/Route404";
import SwitchTheme from "./SwitchTheme";
import SwitchRole from "./SwitchRole";
import Logout from "./Logout";

interface AppEntrypointProps {
  icon?: React.ReactElement;
  title: string;
  subtitle?: string;
  drawerContents?: any[];
  drawerUtils?: any[];
  mobileUtils?: any[];
  routes?: any[];
  defaultRoute?: string;
  contentBefore?: React.ReactElement;
  contentAfter?: React.ReactElement;
}

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  return <ErrorView error={error} />;
};

const AppEntrypoint: React.FC<AppEntrypointProps> = ({
  icon,
  title,
  subtitle = "Questions",
  drawerContents = [],
  drawerUtils = [],
  mobileUtils = [],
  routes = [],
  defaultRoute = "_",
  contentBefore,
  contentAfter
}) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <BasicLayout
          icon={icon}
          title={title}
          subtitle={subtitle}
          drawerContents={[...drawerContents, <SwitchRole />, <SwitchTheme />]}
          drawerUtils={[...drawerUtils, <Logout />]}
          mobileUtils={mobileUtils}
        >
          {contentBefore}
          <Outlet />
          {contentAfter}
        </BasicLayout>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        ...routes.map((route) => ({
          ...route,
          ...(route.errorElement ? {} : { errorElement: <ErrorBoundary /> })
        })),
        {
          path: "",
          element: <Navigate to={defaultRoute} replace />
        },
        {
          path: "*",
          element: <Route404 />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default removeLoadable(AppEntrypoint);
