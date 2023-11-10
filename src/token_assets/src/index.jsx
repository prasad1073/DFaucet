import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';

const init = async () => { 
  const authClient = await AuthClient.create();
  if(await authClient.isAuthenticated()) {
    handleauthenticated(authClient);
  }else{
    await authClient.login({
    identityProvider : "https://identity.ic0.app/#authorize",
    onSuccess : () => {
      handleauthenticated(authClient);
    }
  });
  }
}

async function handleauthenticated(authClient){
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  ReactDOM.render(<App loggedInPrincipal={userPrincipal}/>, document.getElementById("root"));
}

init();



