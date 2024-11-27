import { auth, database } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";

const provider = new GoogleAuthProvider(); 

interface AuthError extends Error {
  code?: string;
  customData?: { email?: string };
}

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log(user);

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      console.log("Verification email sent.");
    }

    const userRef = doc(database, "users", user.uid); 
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      lastLogin: new Date(),
    });

    return { token, user };
  } catch (error: unknown) {
    
    if (error instanceof Error) {
      const authError = error as AuthError;
      const code = authError.code;
      const email = authError.customData?.email;
      if (code === "auth/popup-closed-by-user") {
        console.log("User closed the sign-in popup");
      }
      console.log(
        `An error ${code} occurred when logging user with email: ${email} with message: ${authError.message}`
      );
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

