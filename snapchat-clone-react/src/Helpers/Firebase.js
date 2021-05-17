import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyANdsAQJWKdNf3TrxLg_KNP9jyzOlT1Ss4",
  authDomain: "snapchat-clone-3d10c.firebaseapp.com",
  projectId: "snapchat-clone-3d10c",
  storageBucket: "snapchat-clone-3d10c.appspot.com",
  messagingSenderId: "433818063135",
  appId: "1:433818063135:web:fe45ab7a1a2511bca1202a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
