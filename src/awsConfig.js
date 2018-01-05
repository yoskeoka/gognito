import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
export const AuthConfig = {
  // identityPoolId はCognito Identity PoolのFederatedItentityProviderにGoogleやFacebookを登録している場合に必要。
  // このサンプルではCognito User PoolのユーザーとしてGoogleやFacebookのユーザーをログインさせる(UserPoolのログインIDが付与される)
  // identityPoolId: "us-east-1:6317760e-ae25-4c71-9901-855dd1d9c435", //REQUIRED - Amazon Cognito Identity Pool ID
  region: "us-east-1", // REQUIRED - Amazon Cognito Region
  userPoolId: "us-east-1_VpFb4U9MM", //OPTIONAL - Amazon Cognito User Pool ID
  userPoolWebClientId: "21mafgufsmc9m94kp7jlqemp0d" //OPTIONAL - Amazon Cognito Web Client ID
};

export const GetCognitoAuth = (identifyProvider, onSuccess, onFailure)=>{

  var authData = {
    ClientId : '21mafgufsmc9m94kp7jlqemp0d', // Your client id here
    AppWebDomain : 'fs-fish-test.auth.us-east-1.amazoncognito.com',
    TokenScopesArray : ['profile', 'email', 'openid', 'aws.cognito.signin.user.admin', 'phone'],
    RedirectUriSignIn : 'http://localhost:3000/idpcallback',
    RedirectUriSignOut : 'http://localhost:3000/',
    IdentityProvider: identifyProvider
  };
  var auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess: function(result) {
      if (onSuccess){onSuccess(result);}
      console.log(result);
    },
    onFailure: function(err) {
      console.log(err);
      if (onFailure){onFailure(err);}
    }
  };
  auth.useCodeGrantFlow();

  return auth;

};