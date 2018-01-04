import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

import WithAuthRoutes from "./WithAuthRoutes";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/a" component={WithAuthRoutes} />
    <Route component={NotFound} />
  </Switch>
);
