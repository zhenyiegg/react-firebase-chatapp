import "./App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import React, { useState, useRef } from "react";
import { auth, firestore } from "./firebase";
import ChatMessage from "./components/ChatMessage";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            <header className="App-header">
                <h1>🥚🍳💬</h1>
                <SignOut />
            </header>
            <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
    );
}

export default App;
