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
  { includeGreetings: false }
);

// Cognito Federated IdentitiesでのGoogleとFacebook統合にしか上手く対応しないので今回は使わない
const federated = {
  // google_client_id: "",
  // facebook_app_id: "",
  amazon_client_id: ""
};

const WithAuthRoutes = props => {
  return <WithAuth federated={federated} {...props} />;
};

export default WithAuthRoutes;
