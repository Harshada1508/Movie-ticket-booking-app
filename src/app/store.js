import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import showReducer from '../features/shows/showSlice';
import bookingReducer from '../features/booking/bookingSlice'; // ✅ Add this too

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shows: showReducer,
    booking: bookingReducer,
  },
});

export default store;
