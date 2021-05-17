import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetCameraImage, selectCameraImage } from "../Modules/cameraSlice";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "../Helpers/Firebase";
import firebase from "firebase";
import { selectUser } from "../Modules/appSlice";

function PreviewComponent() {
  const user = useSelector(selectUser);
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    console.log(user);
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      error => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              // profilePic: user.profilePic, error
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <TextFieldsIcon className="preview__icon" />
        <CreateIcon className="preview__icon" />
        <NoteIcon className="preview__icon" />
        <MusicNoteIcon className="preview__icon" />
        <AttachFileIcon className="preview__icon" />
        <CropIcon className="preview__icon" />
        <TimerIcon className="preview__icon" />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" fontSize="small" />
      </div>
    </div>
  );
}

export default PreviewComponent;
