import React, { Component } from "react";
import "./Home.css";
import APITest from "../components/APITest";
export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Cognito Sign-in Sample</h1>
          <h2>Non Member Page</h2>
        </div>
        <APITest />
      </div>
    );
  }
}
