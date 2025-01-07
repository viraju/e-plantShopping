import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Cart items array
  },
  reducers: {
    addItem: (state, action) => {
        const { id, name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ id, name, image, cost, quantity: 1 });
        }
    },
    increment: (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity += 1;
        }
      },
      decrement: (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },
      removeItem: (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      },
    updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity = quantity; // Update quantity if the item exists
        }
    },
  },
});

export const { addItem, increment, decrement, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;