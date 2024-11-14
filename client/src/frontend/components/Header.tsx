import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Header: React.FC = () => {
  const { user, signOut } = useClerk();
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <header className="navbar">
        <button className="sign-out-button" onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back
        </button>
        <h1 className="app-title">
          <a href="/" style={{ color: "white", marginLeft: "-65vh" }}>
            Receiptaurant
          </a>
        </h1>
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
