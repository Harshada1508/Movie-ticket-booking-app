// src/features/booking/Success.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Success = () => {
  const { selectedShowId, selectedSeats } = useSelector((state) => state.booking);
  const { shows } = useSelector((state) => state.shows);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const show = shows.find((s) => s.id === selectedShowId);
  const totalAmount = selectedSeats.length * 150;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('🎟️ Ticket Booking Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user?.name || 'Guest User'}`, 20, 40);
    doc.text(`Email: ${user?.email}`, 20, 50);
    doc.text(`Show: ${show?.title}`, 20, 60);
    doc.text(`Time: ${show?.timing}`, 20, 70);
    doc.text(`Seats: ${selectedSeats.join(', ')}`, 20, 80);
    doc.text(`Total Paid: ₹${totalAmount}`, 20, 90);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 100);

    doc.save('Ticket_Receipt.pdf');
  };

  return (
    <div style={pageStyle}>
      <div style={card}>
        <h2 style={{ color: '#90caf9' }}>✅ Booking Successful!</h2>
        <p style={{ color: '#ccc' }}>Thank you for booking your ticket. Here are your details:</p>

        <div style={infoBox}>
          <p><strong>👤 Name:</strong> {user?.name || 'Guest User'}</p>
          <p><strong>📧 Email:</strong> {user?.email}</p>
          <p><strong>🎬 Show:</strong> {show?.title}</p>
          <p><strong>⏰ Time:</strong> {show?.timing}</p>
          <p><strong>🪑 Seats:</strong> {selectedSeats.join(', ')}</p>
          <p><strong>💰 Total Paid:</strong> ₹{totalAmount}</p>
        </div>

        <button style={btn} onClick={generatePDF}>
          📄 Download Receipt
        </button>

        <button style={{ ...btn, backgroundColor: '#424242' }} onClick={() => navigate('/')}>
          🔙 Back to Home
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
};

const card = {
  backgroundColor: '#1e1e1e',
  padding: '2.5rem',
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  width: '90%',
  maxWidth: '500px',
  color: '#fff',
};

const infoBox = {
  textAlign: 'left',
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  lineHeight: '1.8',
};

const btn = {
  margin: '0.5rem',
  padding: '12px 20px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default Success;
