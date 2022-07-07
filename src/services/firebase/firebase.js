import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "pixzone-e1859.firebaseapp.com",
  projectId: "pixzone-e1859",
  storageBucket: "pixzone-e1859.appspot.com",
  messagingSenderId: "330703585519",
  appId: "1:330703585519:web:6835fff98769724d921b1a",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

// firebase.firestore().enablePersistence()
const auth = firebase.auth();

const storage = firebase.storage();

export { firebase, db, auth, storage };
