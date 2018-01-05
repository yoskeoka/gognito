import React, { Component } from "react";
import { GetCognitoAuth } from "../awsConfig";
import { Redirect } from "react-router-dom";

export default class IDPCallback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needRedirect: false,
      redirectPath: "/"
    }
  }

  componentDidMount() {
    const auth = GetCognitoAuth(null, this.invokeRedirect("/a"), this.invokeRedirect("/"));
    auth.parseCognitoWebResponse(this.props.location.search);
  }

  invokeRedirect = (path) => () => {
    this.setState({ needRedirect: true, redirectPath: path });
  }

  render() {
    if (this.state.needRedirect) {
      return <Redirect to={this.state.redirectPath} />
    }
    return (
      <div className="IDP">
        <div className="lander">
          <h1>IDP Callback</h1>
        </div>
      </div>
    );
  }
}
