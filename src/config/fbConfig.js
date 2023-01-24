import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth';
import "firebase/storage";
const  config = {
    apiKey: "AIzaSyDUJiYzq_mh1TwewYel0fk4VAQnUfgxWbc",
    authDomain: "sokoleo2.firebaseapp.com",
    databaseURL: "https://sokoleo2.firebaseio.com",
    projectId: "sokoleo2",
    storageBucket: "sokoleo2.appspot.com",
    messagingSenderId: "94234711396",
    appId: "1:94234711396:web:6c250553538fe8fed85671",
    measurementId: "G-B4SXMRDTDW"
  };
  
  // // Initialize Firebase
  
  firebase.initializeApp(config);
   firebase.storage();

  export { firebase as default };
 