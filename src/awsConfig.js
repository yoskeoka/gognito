import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
export const GetAuthConfig = () => ({
  // identityPoolId はCognito Identity PoolのFederatedItentityProviderにGoogleやFacebookを登録している場合に必要。
  // このサンプルではCognito User PoolのユーザーとしてGoogleやFacebookのユーザーをログインさせる(UserPoolのログインIDが付与される)
  // identityPoolId: "us-east-1:6317760e-ae25-4c71-9901-855dd1d9c435", //REQUIRED - Amazon Cognito Identity Pool ID
  region: localStorage.getItem("region") || "", // REQUIRED - Amazon Cognito Region
  userPoolId: localStorage.getItem("userPoolId") || "", //OPTIONAL - Amazon Cognito User Pool ID
  userPoolWebClientId: localStorage.getItem("appClientId") || "" //OPTIONAL - Amazon Cognito Web Client ID
});

export const AuthConfigEmpty = () => ({
  region: "",
  userPoolId: "",
  userPoolWebClientId: ""
});
export const GetCognitoAuth = (identifyProvider, onSuccess, onFailure) => {
  var authData = {
    ClientId: localStorage.getItem("appClientId") || "", // Your client id here
    AppWebDomain: `${localStorage.getItem(
      "poolDomain"
    )}.auth.${localStorage.getItem("region")}.amazoncognito.com`,
    TokenScopesArray: [
      "profile",
      "email",
      "openid",
      "aws.cognito.signin.user.admin",
      "phone"
    ],
    RedirectUriSignIn: "http://localhost:3000/idpcallback",
    RedirectUriSignOut: "http://localhost:3000/",
    IdentityProvider: identifyProvider
  };
  var auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess: function(result) {
      if (onSuccess) {
        onSuccess(result);
      }
      console.log(result);
    },
    onFailure: function(err) {
      console.log(err);
      if (onFailure) {
        onFailure(err);
      }
    }
  };
  auth.useCodeGrantFlow();

  return auth;
};
