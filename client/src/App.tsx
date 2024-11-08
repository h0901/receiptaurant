import "./App.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";
import { VITE_CLERK_PUBLISHABLE_KEY } from "./frontend/apis/config";
import RoutesConfig from "./frontend/components/RoutesConfig";

const clerkPublishableKey = VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <h1>Receiptaurant</h1>
        <RoutesConfig />
      </Router>
    </ClerkProvider>
  );
}

export default App;
