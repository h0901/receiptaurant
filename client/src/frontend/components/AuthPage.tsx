import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {isSignUp ? <SignUp /> : <SignIn />}
      {isSignUp ? "Already have an account?" : "Don't have an account?"}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
};

export default AuthPage;
