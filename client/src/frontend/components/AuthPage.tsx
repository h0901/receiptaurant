import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="auth-container">
      <div className="nav-container">
        <header className="navbar">
          <h1 className="app-title">
            <a href="/" style={{ color: "white" }}>
              Receiptaurant
            </a>
          </h1>
        </header>
      </div>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {isSignUp ? <SignUp /> : <SignIn />}
      <div className="switch-text">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
      </div>
      <button className="switch-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
};

export default AuthPage;
