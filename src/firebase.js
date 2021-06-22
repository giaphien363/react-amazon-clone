import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrpqW_MdCiwUTjof6RiFPd3OmUArVSd6E",
  authDomain: "clone-react-c5c9e.firebaseapp.com",
  projectId: "clone-react-c5c9e",
  storageBucket: "clone-react-c5c9e.appspot.com",
  messagingSenderId: "476023850507",
  appId: "1:476023850507:web:b281ad090f4371794fa90e",
  measurementId: "G-HP64SF1ZJS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
