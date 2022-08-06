import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCDSBtdgovpz7ODQVvzIJto0S0UaGhC5ow",
  authDomain: "meeting-moderator.firebaseapp.com",
  projectId: "meeting-moderator",
  storageBucket: "meeting-moderator.appspot.com",
  messagingSenderId: "253597042214",
  appId: "1:253597042214:web:05b4286bbcd4e6733808e7"
};


firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
export { projectAuth, projectFirestore, timestamp }