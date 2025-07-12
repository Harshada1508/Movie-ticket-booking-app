import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { selectedShowId, selectedSeats } = useSelector((state) => state.booking);
  const { shows } = useSelector((state) => state.shows);
  const { user } = useSelector((state) => state.auth); // ✅ Get user info

  const show = shows.find((s) => s.id === selectedShowId);

  if (!show) {
    return <h2 style={{ color: '#fff', textAlign: 'center' }}>🎬 No show selected!</h2>;
  }

  const totalAmount = selectedSeats.length * 150;

  const handlePayment = () => {
    
    const options = {
      key: 'rzp_test_NI8tOMbwMQcTed',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Ticket Booking',
      description: `Booking for ${show.title}`,
      image: 'https://your-logo-url.com/logo.png',
      
handler: async function (response) {
  console.log("User in Razorpay handler:", user); // ✅ Add this

  try {
    await addDoc(collection(db, 'bookings'), {
      showId: show.id,
      showTitle: show.title,
      showTime: show.timing,
      seats: selectedSeats,
      totalAmount,
      email: user?.email || 'guest',
      razorpay_payment_id: response.razorpay_payment_id,
      timestamp: new Date().toISOString(),
    });

    navigate('/success', {
  state: {
    showTitle: show.title,
    showTime: show.timing,
    seats: selectedSeats,
    totalAmount,
    paymentId: response.razorpay_payment_id,
  }
});

  } catch (err) {
    console.error('❌ Firestore Error:', err);
    alert('Payment succeeded but failed to save booking!');
  }
},

      prefill: {
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#1976d2',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ RETURN inside the component function
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>🧾 Checkout Summary</h2>

        <div style={infoRow}>
          <span style={label}>🎬 Show:</span>
          <span style={value}>{show.title}</span>
        </div>

        <div style={infoRow}>
          <span style={label}>⏰ Time:</span>
          <span style={value}>{show.timing}</span>
        </div>

        <div style={infoRow}>
          <span style={label}>🪑 Seats:</span>
          <span style={value}>{selectedSeats.join(', ')}</span>
        </div>

        <div style={infoRow}>
          <span style={label}>💰 Total:</span>
          <span style={value}>₹{totalAmount}</span>
        </div>

        <button style={payBtn} onClick={handlePayment}>
          💳 Pay Now
        </button>
      </div>
    </div>
  );
};

// 💅 Styles
const pageStyle = {
  background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
};

const cardStyle = {
  backgroundColor: '#1e1e1e',
  padding: '2.5rem',
  borderRadius: '15px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
  color: '#fff',
  width: '100%',
  maxWidth: '500px',
  fontFamily: 'Arial, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  color: '#90caf9',
  marginBottom: '2rem',
};

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1.2rem',
  fontSize: '1.1rem',
};

const label = {
  fontWeight: 'bold',
  color: '#ccc',
};

const value = {
  color: '#fff',
};

const payBtn = {
  marginTop: '2rem',
  width: '100%',
  padding: '12px',
  backgroundColor: '#1976d2',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default CheckoutPage;
