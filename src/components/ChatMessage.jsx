import { auth } from "../firebase";

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

export default ChatMessage;
