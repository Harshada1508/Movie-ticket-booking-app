import { createSlice } from '@reduxjs/toolkit';

// Foreign Movies
import inception from '../../assets/inception.jpg';
import interstellar from '../../assets/interstellar.jpg';
import darkKnight from '../../assets/dark-knight.jpg';
import dangal from '../../assets/dangal.jpg';

// Bollywood Movies
import animal from '../../assets/animal.jpg';
import jawan from '../../assets/jawan.jpg';
import rrr from '../../assets/rrr.jpg';
import gadar2 from '../../assets/gadar2.jpg';
import pathaan from '../../assets/pathaan.jpg';
import brahmastra from '../../assets/brahmastra.jpg';
import shershaah from '../../assets/shershaah.jpg';
import andhadhun from '../../assets/andhadhun.jpg';
import super30 from '../../assets/super30.jpg';
import kabirSingh from '../../assets/kabir-singh.jpg';
import oppenheimerPoster from '../../assets/oppenheimer.jpg';
import pushpa2Poster from '../../assets/pushpa2.jpg';
import marvelsPoster from '../../assets/marvels.jpg';
import kesari2Poster from '../../assets/kesari2.jpg';


const initialState = {
  shows: [
    {
      id: 2,
      title: 'Inception',
      description: 'A mind-bending thriller by Nolan.',
      poster: inception,
      timing: '9:00 PM',
    },
    {
      id: 3,
      title: 'Interstellar',
      description: 'Journey through space and time.',
      poster: interstellar,
      timing: '6:00 PM',
    },
    {
      id: 4,
      title: 'The Dark Knight',
      description: 'Batman vs Joker, a classic.',
      poster: darkKnight,
      timing: '8:00 PM',
    },
    {
      id: 5,
      title: 'Dangal',
      description: 'A real-life story of wrestling glory.',
      poster: dangal,
      timing: '5:00 PM',
    },
    {
      id: 6,
      title: 'Animal',
      description: 'An emotional action-drama between father and son.',
      poster: animal,
      timing: '4:00 PM',
    },
    {
      id: 7,
      title: 'Jawan',
      description: 'A soldier’s fight against corruption.',
      poster: jawan,
      timing: '5:30 PM',
    },
    {
      id: 8,
      title: 'RRR',
      description: 'Two revolutionaries fight the British Raj.',
      poster: rrr,
      timing: '6:30 PM',
    },
    {
      id: 9,
      title: 'Gadar 2',
      description: 'Sequel to the iconic Indo-Pak story.',
      poster: gadar2,
      timing: '7:30 PM',
    },
    {
      id: 10,
      title: 'Pathaan',
      description: 'Spy thriller packed with action.',
      poster: pathaan,
      timing: '8:30 PM',
    },
    {
      id: 11,
      title: 'Brahmastra',
      description: 'Mythology meets modern superpowers.',
      poster: brahmastra,
      timing: '3:00 PM',
    },
    {
      id: 12,
      title: 'Shershaah',
      description: 'Biopic of Captain Vikram Batra.',
      poster: shershaah,
      timing: '4:30 PM',
    },
    {
      id: 13,
      title: 'Andhadhun',
      description: 'A blind pianist gets caught in a crime.',
      poster: andhadhun,
      timing: '2:00 PM',
    },
    {
      id: 14,
      title: 'Super 30',
      description: 'Story of mathematician Anand Kumar.',
      poster: super30,
      timing: '1:00 PM',
    },

    {
      id: 15,
      title: 'Kabir Singh',
      description: 'A surgeon’s intense love story.',
      poster: kabirSingh,
      timing: '6:30 PM',
    },
    {
      id: 16,
      title: 'Oppenheimer',
      description: 'The story of J. Robert Oppenheimer and the development of the atomic bomb.',
      poster: oppenheimerPoster, // replace with actual image import or URL
      timing: '3:00 PM',
    },
    {
      id: 17,
      title: 'Pushpa 2',
      description: 'Pushpa returns stronger to face new challenges in the sequel.',
      poster: pushpa2Poster, // replace with actual image import or URL
      timing: '6:00 PM',
    },
    {
      id: 18,
      title: 'The Marvels',
      description: 'A cosmic adventure uniting powerful heroes from the Marvel universe.',
      poster: marvelsPoster, // replace with actual image import or URL
      timing: '8:30 PM',
    },
    {
      id: 19,
      title: 'Kesari Chapter 2',
      description: 'The valor continues in the follow-up to the epic tale of bravery.',
      poster: kesari2Poster, // replace with actual image import or URL
      timing: '5:00 PM',
    },
  ],
};

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
});

export default showSlice.reducer;
