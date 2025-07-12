// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>🎟️ Ticket Booking</Link>

        {/* ✅ Show "My Bookings" only if user is logged in */}
        {user && (
          <Link to="/my-bookings" style={styles.myBookingsBtn}>
            My Bookings
          </Link>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span style={styles.user}>Hi, {user.displayName || "User"}</span>
            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#121212',
    color: '#fff',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    textDecoration: 'none',
    color: '#90caf9',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  myBookingsBtn: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'background 0.3s ease',
  },
  user: { marginRight: '1rem' },
  link: { color: '#fff', marginRight: '1rem', textDecoration: 'none' },
  logout: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;
