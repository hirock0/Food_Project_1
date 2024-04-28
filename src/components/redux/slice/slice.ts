"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: [{ name: "", id: "" }],
  isLoading: false,
  data: null,
  isError: false,
};
export const AllData = createAsyncThunk("Continental_Foods", async (Data) => {
  try{
    const fetchdata = await axios.get("/pages/api/signup");
    const allData = fetchdata.data;
    const fetcAllcart = await axios.get("/pages/api/cart");
    const carts = fetcAllcart.data;
    const fetcAllbuyData = await axios.get("/pages/api/buy_food/buy");
    const buyData = fetcAllbuyData.data;
    return [allData,carts,buyData];
  }catch(error:any){
    return null
  }

});
export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AllData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AllData.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(AllData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});
export const slices = slice.reducer;
