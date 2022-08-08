import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../store/userSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const NewSellerRegister = () => {
  const sign = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [registers, setRegister] = useState({
    firstname: "",
    lastname: "",
    mnfName: "",
    email: "",
    password: "",
    cPassword: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    gstin: "",
    panno: "",
    showPassword: false,
  });

  
  const [sellerImage, setSellerImage] = useState("");
  console.log(sellerImage)
  const handleSevedImage = (e) =>{
    const files = e.target.files[0]
    TransferFile(files)
  }

  const TransferFile = (files) =>{
    const reader = new FileReader();
    if(files){
      reader.readAsDataURL(files)
      reader.onloadend = () =>{
        setSellerImage(reader.result)
      }
    } else{
      setSellerImage("");
    }

  }


  const sendRequest = async () => {
    const res = await axios
      .post(
        "https://shopping-mart-react-app.herokuapp.com/api/seller/register",
        {
          firstname: registers.firstname,
          lastname: registers.lastname,
          mnfName: registers.mnfName,
          email: registers.email,
          password: registers.password,
          address1: registers.address1,
          address2: registers.address2,
          address3: registers.address3,
          Mobile: registers.phone,
          GSTIN: registers.gstin,
          PAN_NO: registers.panno,
          image: sellerImage
        }
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const signIn = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      "https://shopping-mart-react-app.herokuapp.com/api/seller/sellerlogin"
    );

    const {
      mnfName,
      gstin,
      panno,
      firstname,
      lastname,
      email,
      password,
      address1,
      address2,
      address3,
      phone,
    } = registers;

    if (mnfName === "") {
      toast.error("Please Enter Your Manufacture Name");
    } else if (gstin === "") {
      toast.error("GSTIN No. is Require");
    } else if (gstin.length !== 15) {
      toast.error("Please Enter valid GSTIN No.");
    } else if (panno === "") {
      toast.error("PAN No. is Require");
    } else if (panno.length !== 10) {
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
    } else if (phone === "") {
      toast.error("Mobile No. is Required");
    } else if (phone.length < 5 || phone.length !== 10) {
      toast.error("Plz Enter Mobile No. Must be 10 Digit");
    } else if (registers.password !== registers.cPassword) {
      toast.error("Password do not match");
    } else if (
      res.data.sellers.find((user) => user.GSTIN === registers.gstin)
    ) {
      toast.error("This GST No. Already Register");
    } else if (
      res.data.sellers.find((user) => user.PAN_NO === registers.panno)
    ) {
      toast.error("This PAN No. Already Register");
    } else if (
      res.data.sellers.find((user) => user.Mobile === registers.phone)
    ) {
      toast.error("This Mobile No. Already Register");
    } else if (
      res.data.sellers.find((user) => user.email === registers.email)
    ) {
      toast.error("This Email Already Register");
    } else if (
      res.data.sellers.find((user) => user.mnfName === registers.mnfName)
    ) {
      toast.error(`This ${registers.mnfName} Name Already Register`);
    } else {
      sendRequest().then(() => sign("/login"));
      toast.success("Sucessfull Register");
    }
    // localStorage.setItem("seller", JSON.stringify(registers));
  };
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div
        style={{
          width: "auto",
          height: "auto",
        }}
      >
        <div className="container col-lg-7 pt-5 pb-3 justify-content-center">
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
                  Register Seller Account
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
                    onChange={(e) =>
                      setRegister({ ...registers, mnfName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setRegister({ ...registers, gstin: e.target.value })
                    }
                  />
                  <TextField
                    label="PAN No.:"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, panno: e.target.value })
                    }
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
                    onChange={(e) =>
                      setRegister({ ...registers, email: e.target.value })
                    }
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
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={registers.showPassword ? "text" : "password"}
                      value={registers.password}
                      onChange={(e) =>
                        setRegister({ ...registers, password: e.target.value })
                      }
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
                    onChange={(e) =>
                      setRegister({ ...registers, cPassword: e.target.value })
                    }
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
                    onChange={(e) =>
                      setRegister({ ...registers, firstname: e.target.value })
                    }
                  />
                  <TextField
                    label="Lastname"
                    variant="outlined"
                    name="name.lastname"
                    onChange={(e) =>
                      setRegister({ ...registers, lastname: e.target.value })
                    }
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
                    onChange={(e) =>
                      setRegister({ ...registers, address1: e.target.value })
                    }
                  />
                  <TextField
                    label="Address2"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, address2: e.target.value })
                    }
                  />

                  <TextField
                    label="Address3"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, address3: e.target.value })
                    }
                  />
                  <TextField
                    label="Mobile:"
                    type="number"
                    variant="outlined"
                    onChange={(e) =>
                      setRegister({ ...registers, phone: e.target.value })
                    }
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 3, width: "96ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div className="col-lg-10 my-3 justify-content-center">
                  <input type="file" accept="image" onChange={handleSevedImage}/>
                    {sellerImage ? <>
                      <img style={{width:"100px",}} src={sellerImage} alt={sellerImage}/>
                    </> : "The selected image will appear"}
                  </div>
                  </Box>
                <div className="container col-md-10 justify-content-center">
                  <div className="my-5 justify-content-center">
                    <Button
                      className="ml-4 col-md-11 justify-content-center"
                      variant="contained"
                      onClick={signIn}
                      style={{
                        border: "none",
                        borderRadius: "50px",
                      }}
                    >
                      Register
                    </Button>
                  </div>
                  <p>
                    Have an account? <Link to="/Login">Log in</Link>
                  </p>
                </div>
              </div>
            </Container>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSellerRegister;
