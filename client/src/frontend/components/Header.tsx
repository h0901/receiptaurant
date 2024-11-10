import { useClerk } from '@clerk/clerk-react';
import React from 'react';
import '../styles/Home.css';

const Header: React.FC = () => {
    const { user, signOut } = useClerk();
    return (
        <div className="nav-container">
            <header className="navbar">
                <h1 className="app-title">Receiptaurant</h1>
                <div className="user-profile">
                    <span className="user-name">{user?.fullName}</span>
                    <button className="sign-out-button" onClick={() => signOut()}>Sign Out</button>
                </div>
            </header>
        </div>
    )
};

export default Header;