import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

import WithAuthRoutes from "./WithAuthRoutes";
import IDPCallback from "./containers/IDPCallback";
import CognitoClientSetting from "./containers/CognitoClientSetting";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/a" component={WithAuthRoutes} />
    <Route path="/idpcallback" component={IDPCallback} />
    <Route path="/cognitosetting" component={CognitoClientSetting} />
    <Route component={NotFound} />
  </Switch>
);
