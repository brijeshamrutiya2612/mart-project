import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://shopping-mart-react-app.herokuapp.com/api";

const initialState = {
  getUser: [],
  UserStatus: "",
  UserError: "",
  SellerStatus: "",
  SellerError: "",
};

export const getUserData = createAsyncThunk("getUser/getUserData", async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data.users;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});


export const userSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      return {
        ...state,
        UserStatus: "pending",
        UserError: "",
      };
    },
    [getUserData.fulfilled]: (state, action) => {
      return {
        ...state,
        getUser: action.payload,
        UserStatus: "success",
        UserError: "",
      };
    },
    [getUserData.rejected]: (state, action) => {
      return {
        ...state,
        UserStatus: "rejected",
        UserError: action.payload,
      };
    },
  },
});

// export const prodActions = prodSlice.actions;
export default userSlice.reducer;

