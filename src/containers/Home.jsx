import React, { Component } from "react";
import "./Home.css";
import APITest from "../components/APITest";
export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Non Member Page</h1>
          <p>call API with test buttons below</p>
        </div>
        <APITest />
      </div>
    );
  }
}
