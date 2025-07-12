import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setSelectedShow, toggleSeat } from './bookingSlice';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const BookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shows } = useSelector((state) => state.shows);
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const [bookedSeats, setBookedSeats] = useState([]);

  const show = shows.find((s) => s.id === parseInt(id));

  

  // Set selected show ID in Redux
  useEffect(() => {
    if (show) {
      dispatch(setSelectedShow(show.id));
    }
  }, [dispatch, show]);

  // Fetch booked seats from Firestore
  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!show) return;

      const q = query(
        collection(db, 'bookings'),
        where('showId', '==', show.id)
      );

      const querySnapshot = await getDocs(q);
      const allBooked = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allBooked.push(...data.seats); // append all booked seats
      });

      setBookedSeats(allBooked);
    };

    fetchBookedSeats();
  }, [show]);

  if (!show) {
    return (
      <div style={outerDarkBackground}>
        <h2 style={{ color: '#fff' }}>Loading show data or Show not found...</h2>
      </div>
    );
  }

  const seatGrid = [];
  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 10; col++) {
      seatGrid.push(`R${row}S${col}`);
    }
  }

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      dispatch(toggleSeat(seat));
    }

    
  };

  return (
    <div style={outerDarkBackground}>
      <div style={darkWrapper}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#ffffff' }}>
          Book Your Seats for <span style={{ color: '#90caf9' }}>{show.title}</span>
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Legend color="#666" label="Available" />
            <Legend color="#43a047" label="Selected" />
            <Legend color="#ff5252" label="Booked" />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '8px',
            justifyContent: 'center',
            maxWidth: '100%',
            margin: '0 auto',
          }}
        >
          {seatGrid.map((seat) => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            return (
              <div
                key={seat}
                onClick={() => handleSeatClick(seat)}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  backgroundColor: isBooked
                    ? '#ff5252'
                    : isSelected
                    ? '#43a047'
                    : '#666',
                  color: '#fff',
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  transition: '0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  userSelect: 'none',
                  pointerEvents: isBooked ? 'none' : 'auto',
                  opacity: isBooked ? 0.6 : 1,
                }}
              >
                {seat}
              </div>
            );
          })}
        </div>

        <h3 style={{ marginTop: '1.5rem', textAlign: 'center', color: '#fff' }}>
          Selected Seats:{' '}
          <span style={{ color: '#90caf9' }}>
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </span>
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              marginTop: '1.5rem',
              padding: '12px 30px',
              backgroundColor: selectedSeats.length > 0 ? '#1976d2' : '#424242',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.3s ease',
            }}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '4px' }} />
    <span style={{ color: '#ddd' }}>{label}</span>
  </div>
);

const outerDarkBackground = {
  minHeight: '100vh',
  width: '100%',
  background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const darkWrapper = {
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  maxWidth: '900px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  borderRadius: '10px',
  color: '#fff',
};

export default BookingPage;
