import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Member.css";

export default class Member extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="Member">
        <div className="lander">
          <h1>Member Page</h1>
          <p>You can now access to member API</p>
          <Link to={`${match.url}/api`}>Click here to Member API Page</Link>
        </div>
      </div>
    );
  }
}
