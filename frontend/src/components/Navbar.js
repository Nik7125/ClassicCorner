import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [logged, setLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        const storedLogged = localStorage.getItem("logged") === "true";
        const storedUser = localStorage.getItem("currentUser");
        setLogged(storedLogged);
        setCurrentUser(storedUser || '');
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear the local storage and reset state
        localStorage.removeItem('access_token');
        localStorage.removeItem('logged');
        localStorage.removeItem('currentUser');
        setLogged(false);
        setCurrentUser('');
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav style={styles.navbar}>
            <div>
                <Link to="/" style={styles.navItem}>ClassicCorner</Link>
            </div>
            <div style={styles.navLinks}>
                {logged ? (
                    <>
                        <span style={styles.navItem}>Hello,{currentUser}</span>
                        <Link to="/add-item" style={styles.navItem}>Add Item</Link>
                        <Link onClick={handleLogout} style={styles.navItem}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.navItem}>Login</Link>
                        <Link to="/register" style={styles.navItem}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "brown",
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
