//<script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>
  // Initialize Firebase
import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDoWMIXcuZgNnjglM3WYX-r6HkbOLTGEXA",
    authDomain: "test-51a69.firebaseapp.com",
    databaseURL: "https://test-51a69.firebaseio.com",
    projectId: "test-51a69",
    storageBucket: "",
    messagingSenderId: "547379314218"
  };


firebase.initializeApp(config);

const firebaseDB=firebase.database();
const googleAuth=new firebase.auth.GoogleAuthProvider();
export {firebase,
        firebaseDB,
        googleAuth};

