import React from "react";
import ReactDOM from "react-dom/client";
import "material-icons/iconfont/material-icons.css";

// Import all the providers that will be used int the app
// Those providers are exposed as HOC
import {
  withEmitter,
  withI18N,
  withAuth,
  withApolloPublic,
  withApollo,
  withMui,
  withNotistack,
  withLoadable
} from "./state";
import { light, dark } from "./theme";

import App from "./App";

// HOC Providers must be applied in reverse order
// this is already better than [Provider Hell](https://marcopeg.com/context-provider-hell/#:~:text=the%20Galaxy%20and-,Context%20Providers,-to%20the%20index)
// but the best way to manage this issue is using [ForrestJS](https://forrestjs.github.io/)

// New way
const DecoratedApp = [
  (app) => withEmitter(app),
  (app) => withI18N(app),
  (app) => withApolloPublic(app),
  (app) => withAuth(app),
  (app) => withApollo(app),
  (app) => withMui(app, { light, dark }),
  (app) => withNotistack(app),
  (app) => withLoadable(app, { text: "QUESTIONS" })
].reduceRight((acc, curr) => curr(acc), App);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DecoratedApp />
  </React.StrictMode>
);
