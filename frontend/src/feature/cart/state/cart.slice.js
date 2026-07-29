import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setitems: (state, action) => {
      state.items = action.payload;
    },
    additem: (state, action) => {
      state.items.push(action.payload);
    },
    removeitem: (state, action) => {},
    updatequantity: (state, action) => {},
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    seterror: (state, action) => {
      state.error = action.payload;
    },
    incrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;
      const items = state.items.cart?.items;
      if (!items) return;

      state.items.cart.items = items.map((item) =>
        item.product._id === productId && item.variant === variantId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    },
    decrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;
      const items = state.items.cart?.items;
      if (!items) return;

      state.items.cart.items = items.map((item) =>
        item.product._id === productId && item.variant === variantId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    },
  },
});

export const {
  setitems,
  setloading,
  seterror,
  additem,
  removeitem,
  updatequantity,
  incrementCartItem,
  decrementCartItem,
} = cartslice.actions;
export default cartslice.reducer;
