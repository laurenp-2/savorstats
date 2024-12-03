import { signIn } from "../auth/auth"; 


    const SignInButton = () => {
    const handleSignIn = async () => {
      const result = await signIn();
      if (result) {
        console.log("Signed in successfully:", result);
      } else {
        console.log("Sign-in failed.");
      }
    };
  
    return (
      <button onClick={handleSignIn}>Sign in with Google</button>
    );
  };
  
  export default SignInButton;