import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Label } from "@mui/icons-material";
import { toast } from "react-toastify";
import SellerSideBar from "./SellerSideBar";

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

const SellerEditProducts = () => {
  const nav = useNavigate();
  const [{ loading, error, getProd }, dispatch] = useReducer(reducer, {
    getProd: [],
    loading: true,
    error: "",
  });

  const { id } = useParams();
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          `https://shopping-mart-react-app.herokuapp.com/api/products/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  const updateProducts = async () => {
    if (category === "") {
      toast.error("Please Select Category");
    } else if (itemName === "") {
      toast.error("Item Name is Require");
    } else if (itemPrice === "") {
      toast.error("Price is Require");
    } else if (quantity === "") {
      toast.error("Quantity is Required");
    } else if (rating === "") {
      toast.error("Rating is Required");
    } else if (itemUnit === "") {
      toast.error("Unit is Required");
    } else if (itemDescription === "") {
      toast.error("Description is Required");
    } else if (image === "") {
      toast.error("Image is Required");
    }
    try {
      const response = await axios.put(
        `https://shopping-mart-react-app.herokuapp.com/api/products/update/${id}`,
        {
          itemCategory: category,
          itemName: itemName,
          itemPrice: itemPrice,
          quantity: quantity,
          rating: rating,
          itemUnit: itemUnit,
          itemDescription: itemDescription,
          image: image,
        }
      );
      toast.success("Product's Data Updated");
      nav("/SellerProducts");
    } catch (err) {}
  };
  return (
    <>
      <div className="my-5">
        <Row>
          <Col md={2}>
            <SellerSideBar></SellerSideBar>
          </Col>
          <Col lg={8}>
            <div
              style={{
                border: "none",
                borderRadius: "20px",
                width: "100%",
                height: "100%",
              }}
              className="p-4"
            >
              {loading ? (
                <div className="container">
                  <Spinner animation="border" role="status"></Spinner>
                </div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <>
                  <div
                    className="container d-flex"
                    style={{
                      backgroundColor: "white",
                      paddingTop: "2em",
                    }}
                  >
                    <div className="row">
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "35rem" }}
                      >
                        <Card className="card" style={{ border: "none" }}>
                          <Card.Img
                            variant="top"
                            className="card-item"
                            style={{
                              maxHeight: "400px",
                              width: "auto",
                              maxWidth: "500px",
                              minWidth: "100px",
                            }}
                            src={getProd.image}
                          />
                        </Card>
                      </div>
                      <div>
                        <div className="container my-5">
                          <div>
                            <label>Category</label>
                            <label className="ml-2">
                              {getProd.itemCategory.toUpperCase()}
                            </label>
                          </div>
                          <div>
                            <label>Name</label>
                            <label className="ml-2">
                              {getProd.itemName.toUpperCase()}
                            </label>
                          </div>
                          <div>
                            <label>Price</label>
                            <label className="ml-2">{getProd.itemPrice}</label>
                          </div>
                          <div>
                            <label>Quantity</label>
                            <label className="ml-2">{getProd.quantity}</label>
                          </div>
                          <div>
                            <label>Rating</label>
                            <label className="ml-2">{getProd.rating}</label>
                          </div>
                          <div>
                            <label>Unit</label>
                            <label className="ml-2">{getProd.itemUnit}</label>
                          </div>
                          <div>
                            <label>Description</label>
                            <label className="ml-2">
                              {getProd.itemDescription}
                            </label>
                          </div>
                        </div>
                        <div className="container">
                          <FormControl
                            variant="standard"
                            sx={{ minWidth: 520, maxWidth: 500 }}
                          >
                            <InputLabel id="demo-simple-select-standard-label">
                              Product's Category
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={category}
                              onChange={handleChange}
                              label="Age"
                            >
                              <MenuItem selected value={getProd.itemCategory}>
                                {getProd.itemCategory.toUpperCase()}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <form>
                          <Box className="container">
                            <div className="my-3">
                              <TextField
                                label="Item Name"
                                onChange={(e) => setItemName(e.target.value)}
                                className="container"
                                name="itemName"
                              />
                            </div>
                            <div className="my-3">
                              <TextField
                                onChange={(e) => setItemPrice(e.target.value)}
                                name="itemPrice"
                                className="container"
                                id="outlined-read-only-input"
                                label="Item Price"
                              />
                            </div>
                            <div className="my-3">
                              <TextField
                                onChange={(e) => setQuantity(e.target.value)}
                                name="quantity"
                                className="container"
                                id="outlined-read-only-input"
                                label="Item Quantity"
                              />
                            </div>
                            <div className="my-3">
                              <TextField
                                onChange={(e) => setRating(e.target.value)}
                                name="rating"
                                className="container"
                                id="outlined-read-only-input"
                                label="Item Rating"
                              />
                            </div>
                            <div className="my-3">
                              <TextField
                                onChange={(e) => setItemUnit(e.target.value)}
                                name="itemUnit"
                                className="container"
                                id="outlined-read-only-input"
                                label="Item Unit"
                              />
                            </div>
                            <div className="my-3">
                              <TextField
                                onChange={(e) =>
                                  setItemDescription(e.target.value)
                                }
                                name="itemDescription"
                                className="container"
                                id="outlined-read-only-input"
                                label="Item Description"
                              />
                            </div>
                            <Form.Control
                              onChange={(e) => setImage(e.target.value)}
                              name="image"
                              className="my-3"
                              type="text"
                            />
                            <Button
                              className="my-3"
                              variant="success"
                              onClick={updateProducts}
                            >
                              Update Product
                            </Button>
                            <Button
                              className="ml-3"
                              variant="danger"
                              onClick={updateProducts}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SellerEditProducts;
