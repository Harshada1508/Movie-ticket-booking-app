import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShowList from './features/shows/ShowList';
import ShowDetails from './features/shows/ShowDetails';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import BookingPage from './features/booking/BookingPage';
import CheckoutPage from './features/booking/Checkout';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import MyBookings from './features/booking/MyBookings';
import Success from './features/booking/Success';



const App = () => {
  return (
    <>
      <Navbar /> {/* ✅ Always visible on all pages */}
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/success" element={<Success />} />
        



        {/* ✅ Protected Routes */}
        <Route
          path="/book/:id"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
