import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div>
                <Link to="/" style={styles.navItem}>ClassicCorner</Link>
            </div>
            <div style={styles.navLinks}>
                <Link to="/" style={styles.navItem}>Home</Link>
                <Link to="/login" style={styles.navItem}>Login</Link>
                <Link to="/register" style={styles.navItem}>Register</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px',
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    navItem: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
    }
};

export default Navbar;
