import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;

      const q = query(collection(db, 'bookings'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      const userBookings = [];
      querySnapshot.forEach((doc) => {
        userBookings.push({ id: doc.id, ...doc.data() });
      });

      setBookings(userBookings);
    };

    fetchBookings();
  }, [user]);

  const downloadReceipt = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('🎟️ Ticket Booking Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user?.name || 'User'}`, 20, 40);
    doc.text(`Email: ${user?.email}`, 20, 50);
    doc.text(`Show: ${booking.showTitle}`, 20, 60);
    doc.text(`Time: ${booking.showTime}`, 20, 70);
    doc.text(`Seats: ${booking.seats?.join(', ')}`, 20, 80);
    doc.text(`Total Paid: ₹${booking.totalAmount}`, 20, 90);
    doc.text(`Payment ID: ${booking.razorpay_payment_id}`, 20, 100);
    doc.text(`Date: ${new Date(booking.timestamp).toLocaleString()}`, 20, 110);

    doc.save(`Receipt_${booking.id}.pdf`);
  };

  return (
    <div style={pageStyle}>
      <div style={container}>
        <h2 style={heading}>🎟️ My Bookings</h2>

        {bookings.length === 0 ? (
          <p style={noBookingText}>No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} style={card}>
              <div style={row}><strong>🎬 Show:</strong> {booking.showTitle}</div>
              <div style={row}><strong>⏰ Time:</strong> {booking.showTime}</div>
              <div style={row}><strong>🪑 Seats:</strong> {booking.seats?.join(', ')}</div>
              <div style={row}><strong>💰 Total:</strong> ₹{booking.totalAmount}</div>
              <div style={rowSmall}><strong>🧾 Payment ID:</strong> {booking.razorpay_payment_id}</div>
              <div style={rowSmall}><strong>📅 Booked At:</strong> {new Date(booking.timestamp).toLocaleString()}</div>

              <button
                onClick={() => downloadReceipt(booking)}
                style={btn}
              >
                📄 Download Receipt
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 🎨 Styles
const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  maxWidth: '700px',
  width: '100%',
  color: '#fff',
};

const heading = {
  color: '#90caf9',
  textAlign: 'center',
  marginBottom: '2rem',
};

const noBookingText = {
  textAlign: 'center',
  fontSize: '1.1rem',
};

const card = {
  backgroundColor: '#1e1e1e',
  padding: '1rem 1.5rem',
  borderRadius: '10px',
  marginBottom: '1.2rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  fontSize: '0.95rem',
};

const row = {
  marginBottom: '8px',
};

const rowSmall = {
  marginBottom: '5px',
  fontSize: '0.85rem',
  color: '#ccc',
};

const btn = {
  marginTop: '10px',
  padding: '8px 16px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default MyBookings;
