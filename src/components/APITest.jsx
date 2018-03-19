import React, { Component } from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import { getAuthInfo } from "../helper";
export default class APITest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      loginType: "",
      jwtToken: ""
    };
  }

  async componentDidMount() {
    const info = await getAuthInfo();
    if (info.currentSession) {
      // cognito userpool
      const jwtToken = info.currentSession.idToken.jwtToken;
      console.log(jwtToken);
      this.setState({ loginType: "Cognito UserPool", jwtToken });
    } else if (info.currentCredentials) {
      // google, facebook
      const logins = info.currentCredentials.params.Logins;
      if (logins["accounts.google.com"]) {
        this.setState({
          loginType: "Google+",
          jwtToken: logins["accounts.google.com"]
        });
      } else if (logins["graph.facebook.com"]) {
        this.setState({
          loginType: "Facebook",
          jwtToken: logins["graph.facebook.com"]
        });
      }
    }
  }
  handlePublicAPICall = () => {
    axios
      .get("http://localhost:3100/public")
      .then(res => {
        this.setState({ result: res.data.text });
      })
      .catch(err => {
        this.showError(err);
      });
  };

  handleMemberAPICall = () => {
    Auth.currentSession()
      .then(() => {
        this.callMemberAPI();
      })
      .catch(err => {
        console.log(err);
        this.callMemberAPI();
      });
  };

  // dummy JWTは以下のURLで生成できるので、色々と値を変更してチェックが正しいか確かめることが出来る。
  // https://jwt.io/
  dummyJwt = "eyJraWQiOiJEVU1NWSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlN2U3MmFjNy01ZWQ1LTRjMzktYThjMC0wMDAwMDAwMDAwMDAiLCJhdWQiOiIyMW1hZmd1ZnNtYzkwMDAwMDAwMDAwMDAwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiZDhhYTIyNzYtZjE2Yy0xMWU3LWFhZDctMDAwMDAwMDAwMDAwIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1MTUwODM1NDUsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdXMtZWFzdC0xX1ZwRmI0VTlNTSIsImNvZ25pdG86dXNlcm5hbWUiOiJlN2U3MmFjNy01ZWQ1LTRjMzktYThjMC14eHh4eHh4eHh4eHgiLCJleHAiOjE2NjUwODcxNDUsImlhdCI6MTUxNTA4MzU0NSwiZW1haWwiOiJkdW1teUBnZW1jb29rLmNvbSJ9.QFo6MBcE9GHcilnetaldEvO5qnwxg1tpBW5bKIontjg-K3GzAwzGBmKitQfakHYuQJ2XIuLcikKFXOFgGaFlY3kgtY06r93Ju0P_kN5DX7EomVNmvJlG9Y1h7kEZtytMDsq6zK8V7sp-w-rZIuC4XhLf1tIvz-6cWny2oTpOH6U";
  callMemberAPI() {
    const jwt = this.state.jwtToken ? this.state.jwtToken : this.dummyJwt;
    const bearer = `Bearer ${jwt}`;
    const headers = { Authorization: bearer };
    axios
      .get("http://localhost:3100/member", { headers })
      .then(res => {
        this.setState({ result: res.data.text });
      })
      .catch(err => {
        this.showError(err);
      });
  }
  showError(err) {
    if (err.response) {
      this.setState({ result: err.response.data.text });
    } else {
      this.setState({ result: err.message });
    }
  }
  render() {
    return (
      <div>
        <p>login Type: {this.state.loginType}</p>
        <a
          target="_blank"
          href={`https://jwt.io/?token=${this.state.jwtToken}`}
        >
          Open idToken On jwt.io
        </a>
        <p>jwtToken(idToken): {this.state.jwtToken}</p>
        <button onClick={this.handlePublicAPICall}>
          http://localhost:3100/public
        </button>
        <button onClick={this.handleMemberAPICall}>
          http://localhost:3100/member
        </button>
        <div className="result-container">
          <h2>RESULT</h2>
          <div>{this.state.result}</div>
        </div>
      </div>
    );
  }
}
