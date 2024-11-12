import React from "react";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt, FaStore } from "react-icons/fa"; 
import "../styles/Home.css";
import "../styles/AuthPage.css";
import Header from "./Header";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <h2>Welcome to Receiptaurant</h2>
        <div className="description">
          Discover restaurants and manage surcharges easily with Receiptaurant.
        </div>
        <div className="button-container">
          <Link to="/upload-receipt" className="link-button">
            <FaCloudUploadAlt style={{ marginRight: "8px" }} />
            Upload Receipts
          </Link>
          <Link to="/view-restaurant" className="link-button">
            <FaStore style={{ marginRight: "8px" }} />
            View Restaurant Surcharges
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
