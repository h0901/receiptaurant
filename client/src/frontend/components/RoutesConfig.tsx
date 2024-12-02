import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import AuthPage from "./AuthPage";
import UploadReceipt from "./UploadReceipt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const RoutesConfig = () => {
  const { user} = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/sign-in" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <SignedIn>
            <Home />
          </SignedIn>
        }
      />
      <Route
        path="/upload-receipt"
        element={
          <SignedIn>
            <UploadReceipt />
          </SignedIn>
        }
      />
      <Route
        path="/"
        element={
          <SignedOut>
            <Navigate to="/sign-in" replace />
          </SignedOut>
        }
      />
      <Route
        path="*"
        element={
          <SignedOut>
            <Navigate to="/sign-in" replace />
          </SignedOut>
        }
      />
    </Routes>
  );
};

export default RoutesConfig;