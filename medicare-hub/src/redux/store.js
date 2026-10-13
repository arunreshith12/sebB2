import { configureStore, createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { doctorIds: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.doctorIds.includes(id)) {
        state.doctorIds = state.doctorIds.filter(item => item !== id);
      } else {
        state.doctorIds.push(id);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});