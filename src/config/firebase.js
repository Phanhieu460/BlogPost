import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnfiT157OzBngJ--bus5qTe4G9fdoxGsc",
  authDomain: "blogpost-90ba3.firebaseapp.com",
  projectId: "blogpost-90ba3",
  storageBucket: "blogpost-90ba3.appspot.com",
  messagingSenderId: "164127257085",
  appId: "1:164127257085:web:7c4b7a37fe03b4c9d5a994",
  measurementId: "G-HF5N30C47E",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
