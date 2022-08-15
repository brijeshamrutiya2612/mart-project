import React,{useState} from "react";
import Box from "@mui/material/Box";
import {InputLabel} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin";
import Header from "./Header";
import { toast } from "react-toastify";

function AddProducts() {
  const nav = useNavigate();
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemQuantity, setQuantity] = useState("")
  const [rating, setRating] = useState("")
  const [itemUnit, setItemUnit] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [image, setImage] = useState("")

  const sendRequest = async () => {
    const res = await axios
      .post("https://shopping-mart-react-app.herokuapp.com/api/products/add", {
        itemCategory: category,
        itemName: itemName,
        itemPrice: itemPrice,
        quantity: itemQuantity,
        rating: rating,
        itemUnit: itemUnit,
        itemDescription: itemDescription,
        image: image,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if(category === ""){
      toast.error("Please Select Category");
    }else if (itemName === "") {
        toast.error("Item Name is Require");
    } else if (itemPrice === "") {
      toast.error("Price is Require");
    } else if(itemQuantity === ""){
      toast.error("Quantity is Required")
    } else if (rating === "") {
      toast.error("Rating is Required");
    } else if (itemUnit === "") {
      toast.error("Unit is Required");
    } else if (itemDescription === "") {
      toast.error("Description is Required");
    } else if (image === "") {
      toast.error("Image is Required");
    } 
    sendRequest().then((data) => console.log(data));
    nav('/productview')
    setItemName()
  };

  return (
    <>
      <div className="col-lg-15">
        <Admin></Admin>
      </div>
      <div className="container">
        <Typography variant="h5" className="ml-3 my-4">
          Add Products
        </Typography>
      </div>
      <div className="container">
        <div className="container">
          <FormControl variant="standard" sx={{ minWidth: 520, maxWidth: 500 }}>
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
              <MenuItem value="men">Men's Clothing</MenuItem>
              <MenuItem value="women">Women's Clothing</MenuItem>
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
            <Button onClick={handleSubmit} className="my-3" variant="success">
              Add Product
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
}

export default AddProducts;
