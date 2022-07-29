import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { AppBar, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { Rating } from "react-simple-star-rating";
import Display from "../Display/Display";

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

function Home(props) {
  const [{ loading, error, getProd }, dispatch] = useReducer(reducer, {
    getProd: [],
    loading: true,
    error: "",
  });
  const [search, setSearch] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products",
          {}
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  // eslint-disable-next-line
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Welcome to MART</title>
        </Helmet>
        {loading ? (
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : error ? (
          <div className="container pt-5">{error}</div>
        ) : (
          <>
            <div>
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "auto",
                  height: "auto",
                }}
              >
                <AppBar className="mt-5">
                  <div
                    className="my-4 p-2"
                    style={{
                      position: "fixed",
                      width: "100%",
                    }}
                  >
                    <div className="pt-2 pb-2" style={{}}>
                      <Form className="d-flex col-lg-3 mx-auto">
                        <Form.Control
                          type="search"
                          placeholder="Search by product, category..."
                          aria-label="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </Form>
                    </div>
                  </div>
                </AppBar>
                <div style={{ marginTop: "7em" }} />
                <div className="my-4 mt-3">
                  <div>
                    <div className="container col-lg-12 mt-5">
                    
                        {/* <Display text={"hello World"}/> */}
                      
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
