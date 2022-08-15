import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://shopping-mart-react-app.herokuapp.com/api";

const initialState = {
  getSeller: [],
  UserStatus: "",
  UserError: "",
  SellerStatus: "",
  SellerError: "",
};

export const getSellerData = createAsyncThunk("getSeller/getSellerData", async () =>{
  try{
    const response = await axios.get(`${baseUrl}/seller/`)
    console.log(response.data);
    return response.data.sellers;
  } catch (error) {
    console.log(error)
    return error.response.data;
  }
})

export const SellerSlice = createSlice({
  name: "getSeller",
  initialState,
  reducers: {},
  extraReducers: {
    [getSellerData.pending]: (state, action) => {
      return {
        ...state,
        UserStatus: "pending",
        UserError: "",
      };
    },
    [getSellerData.fulfilled]: (state, action) => {
      return {
        ...state,
        getSeller: action.payload,
        UserStatus: "success",
        UserError: "",
      };
    },
    [getSellerData.rejected]: (state, action) => {
      return {
        ...state,
        UserStatus: "rejected",
        UserError: action.payload,
      };
    },
  },
});

// export const prodActions = prodSlice.actions;
export default SellerSlice.reducer;

