import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyAY_LtsHCLXKz28KFrn6ep90-HTn_q8WWw",
    authDomain: "react-firebase-chatapp-b32d9.firebaseapp.com",
    projectId: "react-firebase-chatapp-b32d9",
    storageBucket: "react-firebase-chatapp-b32d9.appspot.com",
    messagingSenderId: "138221671958",
    appId: "1:138221671958:web:2afe87fc321127b4d9c737",
    measurementId: "G-0MY63FEWKN",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [] = useAuthState(auth);
    return (
        <div className="App">
            <header className="App-header"></header>
            <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
    );
}

function SignIn() {}

function ChatRoom() {}

export default App;
