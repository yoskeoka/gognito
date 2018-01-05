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

  handleSignIn = (identityProvider) => () => {
    const auth = GetCognitoAuth(identityProvider, () => {
      this.updateAuthInfo();
    }, () => {
      this.updateAuthInfo();
    });
    auth.getSession();
  }

  handleSignOut = () => {
    const auth = GetCognitoAuth(null, () => {
      this.updateAuthInfo();
    }, () => {
      this.updateAuthInfo();
    });
    auth.signOut();
  }

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
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.state.authenticated ? (
              <Nav pullRight>
                <RouteNavItem href="/a">
                  Member Page{`(${this.state.username})`}
                </RouteNavItem>
              </Nav>
            ) : (
                <Nav pullRight>
                  <RouteNavItem href="/a">Member Page</RouteNavItem>
                </Nav>
              )}
          </Navbar.Collapse>
        </Navbar>
        {this.state.authenticated ?
          <div className="buttons">
          <button onClick={this.handleSignOut}>Sign Out</button>
          </div>
          : (
            <div className="buttons">
              <button onClick={this.handleSignIn("Google")}>Google Sign In</button>
              <button onClick={this.handleSignIn("Facebook")}>Facebook Sign In</button>
              {/* 参考リンク */}
              {/* https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/authorization-endpoint.html */}
              <a href="https://fs-fish-test.auth.us-east-1.amazoncognito.com/authorize?response_type=code&client_id=21mafgufsmc9m94kp7jlqemp0d&identity_provider=Google&scope=openid+email+profile+aws.cognito.signin.user.admin" >Google+ Auth Link</a>
            </div>
          )
        }
        <Routes />
      </div>
    );
  }
}

export default App;
