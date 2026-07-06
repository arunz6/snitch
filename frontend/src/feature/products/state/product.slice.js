import { createSlice } from "@reduxjs/toolkit";

const productslice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    sellersproduct: [],
  },
  reducers: {
    setsellerproducts: (state, action) => {
      state.sellersproduct = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    seterror: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setsellerproducts, setloading, seterror } = productslice.actions;
export default productslice.reducer;
