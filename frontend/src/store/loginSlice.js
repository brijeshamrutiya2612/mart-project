import {
  createSlice,
} from "@reduxjs/toolkit";



export const loginSlice = createSlice({
   name: "login",
   initialState: {
    isLoggedIn: false
   },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});




export const loginActions = loginSlice.actions;
export default loginSlice.reducer
    

