import React, { Component } from "react";
import "./MemberAPI.css";
import APITest from "../../components/APITest";

export default class MemberAPI extends Component {
  render() {
    return (
      <div className="MemberAPI">
        <div className="lander">
          <h1>MemberAPI Page</h1>
          <p>call API with test buttons below</p>
        </div>
        <APITest />
      </div>
    );
  }
}
