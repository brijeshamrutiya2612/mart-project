import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.withCredentials = true;
const initialState = {
  getProd: [],
  addTodoStatus: "",
  addTodoError: "",
  getTodosStatus: "",
  getTodosError: "",
  updateTodoStatus: "",
  updateTodoError: "",
  deleteTodoStatus: "",
  deleteTodoError: "",
  searchTodoStatus: "",
  searchTodoError: "",
}
export const getData = createAsyncThunk(
  "getProd/getData",
  async () => {
    try {
      const response = await axios.get("https://shopping-mart-react-app.herokuapp.com/api/products");
      // console.log(response.data)
      return response.data.products;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const getCategory = createAsyncThunk(
  "getProd/getCategory",
  async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories",{
        withCredentials:false
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const prodSlice = createSlice({
  name: "getProd",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "pending",
        getTodosError: "",
      };
    },
    [getData.fulfilled]: (state, action) => {
      return {
        ...state,
        getProd: action.payload,
        getTodosStatus: "success",
        getTodosError: "",
      };
    },
    [getData.rejected]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "rejected",
        getTodosError: action.payload,
      };
    },
    [getCategory.pending]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "pending",
        getTodosError: "",
      };
    },
    [getCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        getProd: action.payload,
        getTodosStatus: "success",
        getTodosError: "",
      };
    },
    [getCategory.rejected]: (state, action) => {
      return {
        ...state,
        getTodosStatus: "rejected",
        getTodosError: action.payload,
      };
    },
  }
});

// export const prodActions = prodSlice.actions;
export default prodSlice.reducer