import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase";
import { useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { serverTimestamp } from "firebase/firestore";

function ChatRoom() {
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query);
    const [formValue, setFormValue] = useState("");
    const dummy = useRef();

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!formValue) {
            return;
        }

        const { uid, photoURL } = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: serverTimestamp(),
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
                <button type="submit">Send 🐣</button>
            </form>
        </>
    );
}

export default ChatRoom;
