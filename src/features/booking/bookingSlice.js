import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    selectedShowId: null,
    selectedSeats: [],
  },
  reducers: {
    setSelectedShow: (state, action) => {
      state.selectedShowId = action.payload;
    },
    toggleSeat: (state, action) => {
      const seat = action.payload;
      if (state.selectedSeats.includes(seat)) {
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seat);
      } else {
        state.selectedSeats.push(seat);
      }
    },
    clearBooking: (state) => {
      state.selectedSeats = [];
      state.selectedShowId = null;
    },
  },
});

export const { setSelectedShow, toggleSeat, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
