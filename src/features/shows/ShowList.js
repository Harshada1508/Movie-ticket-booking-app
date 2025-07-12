import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ✅ Poster imports
import animalPoster from '../../assets/animal.jpg';
import jawanPoster from '../../assets/jawan.jpg';
import brahmastraPoster from '../../assets/brahmastra.jpg';
import andhadhunPoster from '../../assets/andhadhun.jpg';
import dangalPoster from '../../assets/dangal.jpg';
import darkKnightPoster from '../../assets/dark-knight.jpg';
import gadar2Poster from '../../assets/gadar2.jpg';
import inceptionPoster from '../../assets/inception.jpg';
import interstellarPoster from '../../assets/interstellar.jpg';
import kabirSinghPoster from '../../assets/kabir-singh.jpg';
import pathaanPoster from '../../assets/pathaan.jpg';
import rrrPoster from '../../assets/rrr.jpg';
import shershaahPoster from '../../assets/shershaah.jpg';
import super30Poster from '../../assets/super30.jpg';

const ShowList = () => {
  const { shows } = useSelector((state) => state.shows);

  const updatedShows = shows.map((show) => {
    switch (show.title) {
      case 'Animal': return { ...show, poster: animalPoster };
      case 'Jawan': return { ...show, poster: jawanPoster };
      case 'Brahmastra': return { ...show, poster: brahmastraPoster };
      case 'Andhadhun': return { ...show, poster: andhadhunPoster };
      case 'Dangal': return { ...show, poster: dangalPoster };
      case 'The Dark Knight': return { ...show, poster: darkKnightPoster };
      case 'Gadar 2': return { ...show, poster: gadar2Poster };
      case 'Inception': return { ...show, poster: inceptionPoster };
      case 'Interstellar': return { ...show, poster: interstellarPoster };
      case 'Kabir Singh': return { ...show, poster: kabirSinghPoster };
      case 'Pathaan': return { ...show, poster: pathaanPoster };
      case 'RRR': return { ...show, poster: rrrPoster };
      case 'Shershaah': return { ...show, poster: shershaahPoster };
      case 'Super 30': return { ...show, poster: super30Poster };
      default: return show;
    }
  });

  return (
    <div style={outerContainer}>
      <h1 style={heading}>🎬 Now Showing</h1>
      <div style={gridContainer}>
        {updatedShows.map((show) => (
          <div key={show.id} style={card}>
            <img src={show.poster} alt={show.title} style={poster} />
            <h3 style={title}>{show.title}</h3>
            <p style={description}>{show.description}</p>
            <Link to={`/show/${show.id}`}>
              <button style={button}>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🎨 Styles
const outerContainer = {
  background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
  minHeight: '100vh',
  padding: '2rem',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
};

const heading = {
  textAlign: 'center',
  fontSize: '2rem',
  marginBottom: '2rem',
  color: '#90caf9',
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
};

const card = {
  backgroundColor: '#1e1e1e',
  borderRadius: '10px',
  padding: '1rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s ease',
};

const poster = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '8px',
};

const title = {
  marginTop: '1rem',
  fontSize: '1.3rem',
  color: '#fff',
};

const description = {
  fontSize: '0.9rem',
  color: '#ccc',
  margin: '0.5rem 0 1rem',
  textAlign: 'center',
};

const button = {
  padding: '10px 20px',
  backgroundColor: '#1976d2',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default ShowList;
