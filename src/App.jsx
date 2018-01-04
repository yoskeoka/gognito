import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { getAuthInfo } from "./helper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      username: ""
    };
  }
  async componentDidMount() {
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
        <Routes />
      </div>
    );
  }
}

export default App;
