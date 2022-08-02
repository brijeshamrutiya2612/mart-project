import React, { useContext, useReducer, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";
import { Store } from "../store/Context";
import SellerSideBar from "./SellerSideBar";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, error: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
}

const SellerProfile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sellerInfo } = state;
  const [{ loadingUpdate, error }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
    error: "",
  });
  const nav = useNavigate();
  const [firstname, setFirstname] = useState(sellerInfo.firstname);
  const [lastname, setLastname] = useState(sellerInfo.lastname);
  const [mnfName, setMnfName] = useState(sellerInfo.mnfName);
  const [email, setEmail] = useState(sellerInfo.email);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [address1, setAddress1] = useState(sellerInfo.address1);
  const [address2, setAddress2] = useState(sellerInfo.address2);
  const [address3, setAddress3] = useState(sellerInfo.address3);
  const [mobile, setMobile] = useState(sellerInfo.Mobile);
  const [age, setAge] = useState(sellerInfo.Age);
  const [gstin, setGstIn] = useState(sellerInfo.GSTIN);
  const [PAN_NO, setPAN_NO] = useState(sellerInfo.PAN_NO);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const signIn = async (e) => {
    e.preventDefault();
 
    if (mnfName === "") {
      toast.error("Please Enter Your Manufacture Name");
    } else if (gstin === "") {
      toast.error("GSTIN No. is Require");
    } else if (gstin.length === 15) {
      toast.error("Please Enter valid GSTIN No.");
    } else if (PAN_NO === "") {
      toast.error("PAN No. is Require");
    } else if (PAN_NO.length === 10) {
      toast.error("Please Enter valid PAN No.");
    } else if (firstname === "") {
      toast.error("First Name is Require");
    } else if (firstname.length < 3) {
      toast.error("First Name is Greter than 3 words");
    } else if (lastname === "") {
      toast.error("Last Name is Require");
    } else if (lastname.length < 3) {
      toast.error("Last Name is not valid");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error("Plz Enter Valid Email");
    } else if (password === "") {
      toast.error("Password is Required");
    } else if (password.length < 5) {
      toast.error("Password must be Enter in 6 to 10 Character");
    } else if (address1 === "") {
      toast.error("Address1 is Required");
    } else if (address2 === "") {
      toast.error("Address2 is Required");
    } else if (address3 === "") {
      toast.error("Address3 is Required");
    } else if (mobile === "") {
      toast.error("Mobile No. is Required");
    } else if (mobile.length < 5) {
      toast.error("Plz Enter Mobile No. Must be < 5");
    } 
    if (password !== cPassword) {
      toast.error("Password do not match");
    }

    const res = await axios.get("https://shopping-mart-react-app.herokuapp.com/api/seller/sellerlogin");

    if (res.data.sellers.find((user) => user.GSTIN === gstin)) {
      toast.error("This GST No. Already Register");
    } else if (
      res.data.sellers.find((user) => user.PAN_NO === PAN_NO)
    ) {
      toast.error("This PAN No. Already Register");
    }
    if (res.data.sellers.find((user) => user.Mobile === mobile)) {
      toast.error("This Mobile No. Already Register");
    }
    if (res.data.sellers.find((user) => user.email === email)) {
      toast.error("This Email Already Register");
    }
    if (res.data.sellers.find((user) => user.mnfName === mnfName)) {
      toast.error(`This ${mnfName} Name Already Register` );
    }
    // sendRequest().then(() => sign("/login"));
    // localStorage.setItem("seller", JSON.stringify(registers));
  };

  return (
    <>
      {loadingUpdate ? (
        <>
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        </>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="my-5">
        <Row>
          <Col md={2}>
            <SellerSideBar></SellerSideBar>
          </Col>
          <Col lg={8}>
            
            <div className="container">
              <form>
                <Container className="pt-1 justify-content-center">
                  <div
                    className="container justify-content-center"
                    style={{
                      backgroundColor: "white",
                      overflow: "hidden",
                      boxShadow: "1px 1px 15px #343A40",
                      borderRadius: "20px",
                      opacity: 0.8,
                    }}
                  >
                    <h2 className="container pt-4 ml-4 col-md-11">
                      Seller Profile
                    </h2>
                    <Typography
                      className="container pt-4 ml-2 col-md-11"
                      variant="h6"
                    >
                      Manufacture Information
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 3, width: "96ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Manufacturer Name:"
                        type="text"
                        variant="outlined"
                        value={mnfName}
                        onChange={(e) => setMnfName(e.target.value)}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 3, width: "33ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="GSTIN No.:"
                        type="text"
                        variant="outlined"
                        value={gstin}
                        onChange={(e) => setGstIn(e.target.value)}
                      />
                      <TextField
                        label="PAN No.:"
                        type="text"
                        variant="outlined"
                        value={PAN_NO}
                        onChange={(e) => setPAN_NO(e.target.value)}
                      />
                    </Box>
                    <Typography
                      className="container pt-4 ml-2 col-md-11"
                      variant="h6"
                    >
                      Create Seller Email
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 3, width: "96ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 3, width: "45ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                      <TextField
                        label="confirm Password"
                        type="password"
                        variant="outlined"
                        name="cPassword"
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </Box>
                    <Typography
                      className="container pt-4 ml-2 col-md-11"
                      variant="h6"
                    >
                      Personal Information
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 3, width: "45ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Firstname"
                        variant="outlined"
                        type="text"
                        name="name.firstname"
                        htmlFor="component-outlined"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                      <TextField
                        label="Lastname"
                        variant="outlined"
                        name="name.lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 3, width: "45ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Address1"
                        type="text"
                        variant="outlined"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                      <TextField
                        label="Address2"
                        type="text"
                        variant="outlined"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />

                      <TextField
                        label="Address3"
                        type="text"
                        variant="outlined"
                        value={address3}
                        onChange={(e) => setAddress3(e.target.value)}
                      />
                      <TextField
                        label="Mobile:"
                        type="number"
                        variant="outlined"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      <TextField
                        label="Age:"
                        type="number"
                        variant="outlined"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Box>
                    <div className="container col-md-10 justify-content-center">
                      <div className="my-5 justify-content-center">
                        <Button
                          className="ml-4 col-md-11 justify-content-center"
                          onClick={signIn}
                          style={{
                            border: "none",
                            borderRadius: "50px",
                            background:"#557794"
                          }}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </Container>
              </form>
            </div>
          </Col>
          </Row>
          </div>
        </>
      )}
    </>
  );
};

export default SellerProfile;
