import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import RadioButtonUnCheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { auth, db } from "../Helpers/Firebase";
import ChatComponent from "./ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Modules/appSlice";
import { useHistory } from "react-router";
import { resetCameraImage } from "../Modules/cameraSlice";

function ChatsComponent() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src="https://i.ya-webdesign.com/images/snapchat-png-icon-6.png"
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <CancelIcon
          onClick={() => auth.signOut()}
          className="chats__closeIcon"
        />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <ChatComponent
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
            />
          )
        )}
      </div>
      <RadioButtonUnCheckedIcon
        className="chats__takeShot"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default ChatsComponent;
