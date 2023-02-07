import { configureStore } from '@reduxjs/toolkit';
import dogReducer  from './slices/dogSlice';

export const store = configureStore({
  reducer: {
    dogReducer
  },
});