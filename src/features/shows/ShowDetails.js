import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shows } = useSelector((state) => state.shows);

  const selectedShow = shows.find((show) => show.id === parseInt(id));

  if (!selectedShow) {
    return (
      <div style={errorContainer}>
        <h2>🎭 Show Not Found</h2>
      </div>
    );
  }

  return (
    <div style={outerContainer}>
      <div style={card}>
        <img
          src={selectedShow.poster}
          alt={selectedShow.title}
          style={poster}
        />
        <div style={content}>
          <h2 style={title}>{selectedShow.title}</h2>
          <p style={timing}><strong>Time:</strong> {selectedShow.timing}</p>
          <p style={description}><strong>Description:</strong> {selectedShow.description}</p>
          <button
            onClick={() => navigate(`/book/${selectedShow.id}`)}
            style={button}
          >
            🎟 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// 🎨 Styling
const outerContainer = {
  background: 'linear-gradient(to right, #141e30, #243b55)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  color: '#fff',
};

const card = {
  display: 'flex',
  flexDirection: 'row',
  gap: '2rem',
  backgroundColor: '#1e1e1e',
  borderRadius: '10px',
  padding: '2rem',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  maxWidth: '900px',
  width: '100%',
  flexWrap: 'wrap',
};

const poster = {
  width: '300px',
  height: 'auto',
  borderRadius: '10px',
  objectFit: 'cover',
};

const content = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const title = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '#90caf9',
};

const timing = {
  fontSize: '1.1rem',
  marginBottom: '1rem',
  color: '#ccc',
};

const description = {
  fontSize: '1rem',
  color: '#ddd',
  marginBottom: '1.5rem',
};

const button = {
  padding: '10px 20px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const errorContainer = {
  background: '#0f2027',
  color: '#fff',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
};

export default ShowDetails;
