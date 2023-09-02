import "./App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import React, { useState, useRef } from "react";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            <header className="App-header">
                <section>{user ? <ChatRoom /> : <SignIn />}</section>
            </header>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out</button>
        )
    );
}

function ChatRoom() {
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query);
    const [formValue, setFormValue] = useState("");
    const dummy = useRef();

    console.log(messages);
    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userId: uid,
            photoURL,
        });

        setFormValue("");
        dummy.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <main>
                {messages &&
                    messages.map((msg, id) => {
                        return <ChatMessage key={id} message={msg} />;
                    })}
                <div ref={dummy}></div>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                />
                <button type="submit">Send🐣</button>
            </form>
        </>
    );
}

function ChatMessage(props) {
    const { message } = props;
    const { text, userId, photoURL } = message;
    const messageClass = userId === auth.currentUser.uid ? "sent" : "received";

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    );
}

export default App;
