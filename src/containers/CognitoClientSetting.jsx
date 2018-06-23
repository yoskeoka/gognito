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

import Amplify from "aws-amplify";

// import { Panel } from "react-bootstrap/lib/Panel";

import "./CognitoClientSetting.css";
export default class CognitoClientSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: localStorage.getItem("region") || "",
      userPoolId: localStorage.getItem("userPoolId") || "",
      appClientId: localStorage.getItem("appClientId") || "",
      poolDomain: localStorage.getItem("poolDomain") || ""
    };
  }

  handleChange = target => e => {
    this.setState({
      [target]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { region, userPoolId, appClientId, poolDomain } = this.state;

    try {
      Amplify.configure({
        Auth: {
          region: region,
          userPoolId: userPoolId,
          userPoolWebClientId: appClientId
        }
      });
    } catch (e) {
      console.error(e);
      return;
    }

    localStorage.setItem("region", region);
    localStorage.setItem("userPoolId", userPoolId);
    localStorage.setItem("appClientId", appClientId);
    localStorage.setItem("poolDomain", poolDomain);
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
                User Pool Id
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
                App Client Id
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
            <FormGroup controlId="formPoolDomain">
              <Col componentClass={ControlLabel} sm={2}>
                Pool Domain
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.poolDomain || ""}
                  placeholder="cognito user pool domain"
                  onChange={this.handleChange("poolDomain")}
                />
                <HelpBlock>
                  just input 'your-domain'. https://<span class="domain-text">
                    your-domain
                  </span>.auth.us-east-1.amazoncognito.com
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
