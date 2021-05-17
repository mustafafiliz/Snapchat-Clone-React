import React, { useEffect } from "react";
import {
  CameraScreen,
  ChatsScreen,
  PreviewScreen,
  ViewScreen,
  LoginScreen,
} from "../Screens";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./appSlice";
import { auth } from "../Helpers/Firebase";

function Navigator() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoUrl,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <Router>
      {!user ? (
        <LoginScreen />
      ) : (
        <Switch>
          <Route exact path="/" component={CameraScreen} />
          <Route exact path="/preview" component={PreviewScreen} />
          <Route exact path="/chats" component={ChatsScreen} />
          <Route exact path="/chats/view" component={ViewScreen} />
        </Switch>
      )}
    </Router>
  );
}

export default Navigator;
