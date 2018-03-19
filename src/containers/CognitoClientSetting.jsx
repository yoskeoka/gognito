import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Button,
  FormControl,
  Col,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

// import { Panel } from "react-bootstrap/lib/Panel";

import "./CognitoClientSetting.css";
export default class CognitoClientSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: localStorage.getItem("region") || "",
      userPoolId: localStorage.getItem("userPoolId") || "",
      appClientId: localStorage.getItem("appClientId") || "",
      appClientDomain: localStorage.getItem("appClientDomain") || ""
    };
  }

  handleChange = target => e => {
    this.setState({
      [target]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const { region, userPoolId, appClientId, appClientDomain } = this.state;
    localStorage.setItem("region", region);
    localStorage.setItem("userPoolId", userPoolId);
    localStorage.setItem("appClientId", appClientId);
    localStorage.setItem("appClientDomain", appClientDomain);
  };

  render() {
    return (
      <div className="CognitoClientSetting">
        <div className="lander">
          <h1>Cognito Client Setting</h1>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formAWSRegion">
              <Col componentClass={ControlLabel} sm={2}>
                Region
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.region || ""}
                  placeholder="us-east-1"
                  onChange={this.handleChange("region")}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formUserPoolId">
              <Col componentClass={ControlLabel} sm={2}>
                UserPoolId
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.userPoolId || ""}
                  placeholder="us-east-1_XXXXXXXXX"
                  onChange={this.handleChange("userPoolId")}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formAppClientId">
              <Col componentClass={ControlLabel} sm={2}>
                AppClientId
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.appClientId || ""}
                  placeholder="cognito user pool app client id"
                  onChange={this.handleChange("appClientId")}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formAppClientDomain">
              <Col componentClass={ControlLabel} sm={2}>
                AppClientDomain
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.appClientDomain || ""}
                  placeholder="cognito user pool app client domain"
                  onChange={this.handleChange("appClientDomain")}
                />
                <HelpBlock>
                  just input 'your-domain'.
                  https://your-domain.auth.us-east-1.amazoncognito.com
                </HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" type="submit">
                  Save
                </Button>
              </Col>
            </FormGroup>
          </Form>
          {/* <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel> */}
        </div>
      </div>
    );
  }
}
