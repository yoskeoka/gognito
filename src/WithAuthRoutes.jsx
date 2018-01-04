import React from "react";
import { Route, Switch } from "react-router-dom";
import Member from "./containers/withauth/Member";
import MemberAPI from "./containers/withauth/MemberAPI";
import NotFound from "./containers/NotFound";
import { withAuthenticator } from "aws-amplify-react";

const WithAuth = withAuthenticator(
  ({ match }) => (
    <Switch>
      <Route path={match.url} exact component={Member} />
      <Route path={`${match.url}/api`} component={MemberAPI} />
      <Route component={NotFound} />
    </Switch>
  ),
  { includeGreetings: true }
);

const federated = {
  google_client_id:
    "469604330843-bc50a8adc8v1a9sqfgrpadfp5s4isid1.apps.googleusercontent.com",
  facebook_app_id: "1726717330712363",
  amazon_client_id: ""
};

const WithAuthRoutes = props => {
  return <WithAuth federated={federated} {...props} />;
};

export default WithAuthRoutes;
