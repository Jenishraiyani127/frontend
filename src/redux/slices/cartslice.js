import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items);
    },
    incrementQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.items);
    },
    decrementQuantity(state, action) {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
        saveCartToStorage(state.items);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
