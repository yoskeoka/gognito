import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { GetAuthConfig, AuthConfigEmpty } from "./awsConfig";

try {
  Amplify.configure({
    Auth: GetAuthConfig()
  });
} catch (e) {
  Amplify.configure({
    Auth: AuthConfigEmpty()
  });
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
