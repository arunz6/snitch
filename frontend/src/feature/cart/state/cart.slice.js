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
  },
});

export const { setitems, setloading, seterror, additem, removeitem, updatequantity } =
  cartslice.actions;
export default cartslice.reducer;
