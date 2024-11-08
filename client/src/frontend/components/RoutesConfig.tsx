import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import AuthPage from "./AuthPage";
import UploadReceipt from "./UploadReceipt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoutesConfig = () => {
  const { user } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/upload", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/sign-in" element={<AuthPage />} />

      <Route
        path="/upload"
        element={
          <SignedIn>
            <h2>Welcome {user?.firstName}!</h2>
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
