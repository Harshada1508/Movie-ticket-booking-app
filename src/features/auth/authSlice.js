import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (foundUser) {
      return {
        user: { email: foundUser.email },
        token: 'mock-token-123',
      };
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const existingUser = users.find((user) => user.email === userData.email);
      if (existingUser) {
        return thunkAPI.rejectWithValue('User already exists');
      }

      const updatedUsers = [...users, userData];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return {
        user: { email: userData.email },
        token: 'mock-token-456',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
