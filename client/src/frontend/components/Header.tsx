import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/Home.css";

const Header: React.FC = () => {
  const { user, signOut } = useClerk();

  return (
    <div className="nav-container">
      <header className="navbar">
        <h1 className="app-title">
          <a href="/" style={{ color: "white" }}>
            Receiptaurant
          </a>
        </h1>
        <nav className="nav-tabs">
          <a href="/" className="tab-button">
            Home
          </a>
          <a href="/upload-receipt" className="tab-button">
            New Bill
          </a>
        </nav>
        <div className="user-profile">
          <FaUserCircle style={{ fontSize: "2rem", marginRight: "10px" }} />
          <span className="user-name">Welcome, {user?.firstName}!</span>
          <button className="sign-out-button" onClick={() => signOut()}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Sign Out
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
