import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
 
Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:6317760e-ae25-4c71-9901-855dd1d9c435', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_VpFb4U9MM', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '21mafgufsmc9m94kp7jlqemp0d', //OPTIONAL - Amazon Cognito Web Client ID
  }
});
 
class AppWithAuth extends Component {
  render() {
    return <Authenticator />
  }
}
 
export default AppWithAuth;
