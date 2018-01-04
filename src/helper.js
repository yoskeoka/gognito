import { Auth } from "aws-amplify";
export async function getAuthInfo() {
  const info = {
    currentAuthenticatedUser: null,
    currentCredentials: null,
    currentSession: null,
    currentUserCredentials: null,
    currentUserPoolUser: null,
    currentUserInfo: null
  };

  try {
    console.log("Current UserPoolUser");
    info.currentUserPoolUser = await Auth.currentUserPoolUser();
    console.log(info.currentUserPoolUser);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Current Authenticated User");
    info.currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
    console.log(info.currentAuthenticatedUser);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Current Session");
    info.currentSession = await Auth.currentSession();
    console.log(info.currentSession);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Current UserCredentials");
    info.currentUserCredentials = await Auth.currentUserCredentials();
    console.log(info.currentUserCredentials);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Current Credentials");
    info.currentCredentials = await Auth.currentCredentials();
    console.log(info.currentCredentials);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Current UserInfo");
    info.currentUserInfo = await Auth.currentUserInfo();
    console.log(info.currentUserInfo);
  } catch (e) {
    console.log(e);
  }

  return info;
}
