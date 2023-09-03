import { auth } from "../firebase";

function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out 🐥</button>
        )
    );
}

export default SignOut;
