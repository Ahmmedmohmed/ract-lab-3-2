import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
      state.totalQuantity++;
      state.totalPrice += action.payload.price;
    },
    removeFromCart(state, action) {
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.totalPrice;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
    increaseQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
        state.totalPrice += item.price;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
        state.totalPrice -= item.price;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
        state.totalQuantity--;
        state.totalPrice -= item.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
