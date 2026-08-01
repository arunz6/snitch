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
      const cartObj = Array.isArray(state.items?.cart)
        ? state.items.cart[0]
        : Array.isArray(state.items)
        ? state.items[0]
        : state.items?.cart || state.items;

      if (!cartObj?.items) return;

      cartObj.items = cartObj.items.map((item) => {
        const itemProdId = item.product?._id || item.product;
        const itemVarId = item.variant?._id || item.variant;
        if (itemProdId === productId && itemVarId === variantId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;
      const cartObj = Array.isArray(state.items?.cart)
        ? state.items.cart[0]
        : Array.isArray(state.items)
        ? state.items[0]
        : state.items?.cart || state.items;

      if (!cartObj?.items) return;

      cartObj.items = cartObj.items.map((item) => {
        const itemProdId = item.product?._id || item.product;
        const itemVarId = item.variant?._id || item.variant;
        if (itemProdId === productId && itemVarId === variantId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
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
