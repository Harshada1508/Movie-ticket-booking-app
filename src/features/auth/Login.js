import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../auth/authSlice'; // ✅ import action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ for setting Redux state

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      await auth.currentUser.reload();

    if (!auth.currentUser.emailVerified) {
        alert('Please verify your email before logging in.');
        return;
      }
      const user = userCredential.user;

      // ✅ Dispatch to Redux
      dispatch(setUser({
        email: user.email,
        name: user.displayName || 'User',
      }));

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={bgStyle}>
      <div style={card}>
        <h2 style={title}>🔐 Login</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={input}
            required
          />
          <button type="submit" style={button}>Login</button>
          {error && <p style={errorText}>{error}</p>}
        </form>
      </div>
    </div>
  );
};


// 🎨 Shared Dark Theme Styles
const bgStyle = {
  minHeight: '100vh',
  background: '#121212',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const card = {
  backgroundColor: '#1e1e1e',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
  width: '90%',
  maxWidth: '400px',
  color: '#fff',
};

const title = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#90caf9',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const input = {
  padding: '12px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #444',
  backgroundColor: '#2a2a2a',
  color: '#fff',
};

const button = {
  padding: '12px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '1rem',
};

const errorText = {
  color: 'red',
  marginTop: '0.5rem',
  fontSize: '0.9rem',
  textAlign: 'center',
};

export default Login;
