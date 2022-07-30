import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Admin from "../Admin";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, getProd: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


function Dashboard() {
  const [{ loading, error, getProd }, dispatch] = React.useReducer(reducer, {
    getProd: [],
    loading: true,
    error: "",
  });
  const [filter, setFilter] = React.useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const getUnique = (arr, index) => {
      const unique = getProd
        .map((e) => e[index])
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter((e) => arr[e])
        .map((e) => arr[e]);
      return unique;
    };
    setFilter(getUnique(getProd, "itemCategory"));
  }, [getProd]);
  const mediaTypes = getProd
    .map((dataItem) => dataItem.itemCategory) // get all media types
    .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates

  const counts = mediaTypes.map((mediaType) => ({
    type: mediaType,
    count: getProd.filter((item) => item.itemCategory === mediaType).length,
  }));
  return (
    <>
    <div className="col-lg-15">
      <Admin></Admin>
      </div>
        <div className="container col-lg-15">
      <Typography variant="h5" className="ml-3 my-4">
        Dashboard
      </Typography>
      <TableContainer component={Paper} className="container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <strong>Products</strong>
              </TableCell>
              <TableCell align="right">{getProd.length}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <strong>Category</strong>
              </TableCell>
              <TableCell align="right">{filter.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" className="ml-3 my-3 mt-5">Products &#x0026; Category</Typography>
      <TableContainer component={Paper} className="mt-3 container my-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              style={{
                borderRight: "none",
              }}
            >
              <TableCell>Category</TableCell>
            {counts.map((item, i) => {
              return (
                <>
                    <TableCell style={{ borderRight: "0px" }} align="center">
                      {item.type.toUpperCase()}
                    </TableCell>
                </>
              );
            })}
            </TableRow>
            <TableRow
                    style={{
                      borderRight: "none",
                    }}
                  >
                    <TableCell>Products</TableCell>
                    {counts.map((item, i) => {
              return (
                <>
                    <TableCell align="center">{item.count}</TableCell>
                  </>
              )})}
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}

export default Dashboard;
