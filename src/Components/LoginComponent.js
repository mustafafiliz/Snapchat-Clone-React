import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "../Helpers/Firebase";
import { login } from "../Modules/appSlice";

function LoginComponent() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://nexusconsultancy.co.uk/wp-content/uploads/2018/10/snapchat-1360003_1920.jpg"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default LoginComponent;
