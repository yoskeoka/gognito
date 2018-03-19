import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { getAuthInfo } from "./helper";
import { GetCognitoAuth } from "./awsConfig";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      username: ""
    };
  }

  handleSignIn = identityProvider => () => {
    const auth = GetCognitoAuth(
      identityProvider,
      () => {
        this.updateAuthInfo();
      },
      () => {
        this.updateAuthInfo();
      }
    );
    auth.getSession();
  };

  handleSignOut = () => {
    const auth = GetCognitoAuth(
      null,
      () => {
        this.updateAuthInfo();
      },
      () => {
        this.updateAuthInfo();
      }
    );
    auth.signOut();
  };

  async updateAuthInfo() {
    const info = await getAuthInfo();

    if (info.currentUserInfo) {
      this.setState({
        authenticated: true,
        username: info.currentUserInfo.username
          ? info.currentUserInfo.username
          : info.currentUserInfo.name
      });
    } else {
      this.setState({ authenticated: false, username: null });
    }
  }

  componentDidMount() {
    this.updateAuthInfo();
  }

  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <RouteNavItem href="/cognitosetting">
              Cognito Setting
            </RouteNavItem>
          </Nav>
          <Nav pullRight>
            <RouteNavItem href="/a">
              Member Page{this.state.authenticated
                ? `(${this.state.username})`
                : ""}
            </RouteNavItem>
          </Nav>
        </Navbar>
        {this.state.authenticated ? (
          <div className="buttons">
            <button onClick={this.handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="buttons">
            {/* 
               identity_providerに使える値
               Facebook, Google, LoginWithAmazon, 
               */}
            <button onClick={this.handleSignIn("Google")}>
              Google Sign In
            </button>
            <button onClick={this.handleSignIn("Facebook")}>
              Facebook Sign In
            </button>
            <button onClick={this.handleSignIn("")}>
              Open Cognito User Pools Sign In Page
            </button>
          </div>
        )}
        <Routes />
      </div>
    );
  }
}

export default App;
