import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SellerSideBar from "./SellerSideBar";
import { Store } from "../store/Context";

function SellerAddProduct() {
  const nav = useNavigate();
  const [category, setCategory] = useState("");
  const { state } = useContext(Store);
  const { sellerInfo } = state;

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [image, setImage] = useState("");

  const sendRequest = async () => {
    const res = await axios
      .post("https://shopping-mart-react-app.herokuapp.com/api/products/add", {
        itemCategory: category,
        itemName: itemName,
        mnfName: sellerInfo.mnfName,
        itemPrice: itemPrice,
        quantity: itemQuantity,
        itemUnit: itemUnit,
        itemDescription: itemDescription,
        image: image,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "") {
      toast.error("Please Select Category");
    } else if (itemName === "") {
      toast.error("Item Name is Require");
    } else if (itemPrice === "") {
      toast.error("Price is Require");
    } else if (itemQuantity === "") {
      toast.error("Quantity is Required");
    } else if (itemUnit === "") {
      toast.error("Unit is Required");
    } else if (itemDescription === "") {
      toast.error("Description is Required");
    } else if (image === "") {
      toast.error("Image is Required");
    }
    sendRequest();
    nav("/SellerProduct");
    setItemName("");
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
                background: "#D8E4E6",
                boxShadow: "5px 5px 15px #888888",
                borderRadius: "20px",
                width: "100%",
                height: "100%",
              }}
              className="p-4"
            >
              <div className="container">
                <Typography variant="h5" className="ml-3 my-4">
                  Add Products
                </Typography>
              </div>
              <div className="container">
                <div className="container">
                  <FormControl className="container" variant="standard">
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
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Food">Food</MenuItem>
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="men's clothing">Men's Clothing</MenuItem>
                      <MenuItem value="women's clothing">
                        Women's Clothing
                      </MenuItem>
                      <MenuItem value="jewelery">Jewelery</MenuItem>
                      <MenuItem value="Sports">Sports</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <form>
                  <Box className="container">
                    <div className="my-3">
                      <TextField
                        onChange={(e) => setItemName(e.target.value)}
                        label="Item Name"
                        className="container"
                        name="itemName"
                        id="outlined-read-only-input"
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
                        name="itemQuantity"
                        className="container"
                        id="outlined-read-only-input"
                        label="Item Quantity"
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
                        onChange={(e) => setItemDescription(e.target.value)}
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
                      onClick={handleSubmit}
                      className="my-3"
                      variant="success"
                    >
                      Add Product
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SellerAddProduct;
