import firebase from "@firebase/app";
import "@firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDKufFiTUxUTmG37xJaGEnY2P2fATJLBZ4",
  authDomain: "trainee-9f750.firebaseapp.com",
  databaseURL: "https://trainee-9f750.firebaseio.com",
  projectId: "trainee-9f750",
  storageBucket: "trainee-9f750.appspot.com",
  messagingSenderId: "658860658582",
  appId: "1:658860658582:web:b09235f43e677e5c2917b7",
  measurementId: "G-WTRBKJ6VVC"
};

firebase.initializeApp(firebaseConfig);
// firebase.initializeApp()

const storage = firebase.storage();
export { storage, firebase as default };
