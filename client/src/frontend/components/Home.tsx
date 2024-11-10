import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import '../styles/AuthPage.css';
import Header from './Header'

const Home: React.FC = () => {
    
    return (
        <div className="home-container">
            <Header />
            <main className="main-content">
                <h2>Welcome to Receiptaurant</h2>
                <div className="button-container">
                    <Link to="/upload-receipt" className="link-button">Upload Receipts</Link>
                    <Link to="/view-restaurant" className="link-button">View Restaurant Surcharges</Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
