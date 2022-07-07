import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('persist:contacts')
  ? JSON.parse(localStorage.getItem('persist:contacts')).items
  : [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      return [...state, payload];
    },
    deleteItem(state, { payload }) {
      return state.filter(item => item.id !== payload.id);
    },
  },
});

export const { addItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
