import React, { useContext, useReducer, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { Box, Input, TextField } from "@mui/material";
import { Store } from "../../store/Context";
import SideBar from "./SideBar";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../../utils";
import { useNavigate } from "react-router-dom";

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

const Userprofile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loadingUpdate, error }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
    error: "",
  });
  const nav = useNavigate();
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [address1, setAddress1] = useState(userInfo.address1);
  const [address2, setAddress2] = useState(userInfo.address2);
  const [address3, setAddress3] = useState(userInfo.address3);
  const [phone, setPhone] = useState(userInfo.phone);
  const [age, setAge] = useState(userInfo.age);

  const sendUpdateRequest = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password do not match");
      return;
    }

    if (firstname === "") {
      toast.info("First Name is Require");
    } else if (firstname.length < 3) {
      toast.info("First Name is Greter than 3 words");
    } else if (lastname === "") {
      toast.info("Last Name is Require");
    } else if (lastname.length < 3) {
      toast.info("Last Name is not valid");
    } else if (email === "") {
      toast.info("Email is Required");
    } else if (!email.includes("@")) {
      toast.info("Plz Enter Valid Email");
    } else if (password === "") {
      toast.info("Password is Required");
    } else if (password.length < 5) {
      toast.info("Password must be Enter in 6 to 10 Character");
    } else if (address1 === "") {
      toast.info("Address1 is Required");
    } else if (address2 === "") {
      toast.info("Address2 is Required");
    } else if (address3 === "") {
      toast.info("Address3 is Required");
    } else if (phone === "") {
      toast.info("Mobile No. is Required");
    } else if (phone.length < 5) {
      toast.info("Plz Enter Valid Mobile No.");
    } else if (age === "") {
      toast.info("Age is Require");
    }

    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/profile",
        {
          firstname,
          lastname,
          email,
          password,
          address1,
          address2,
          address3,
          phone,
          age,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(err));
    }
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
                  <SideBar></SideBar>
              </Col>
              <Col lg={10}>
                <div className="col-lg-11">
                  <ToastContainer position="top-center" limit={1} />
                  <div>
                    <div>
                      <div>
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
                                Profile
                              </h2>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Firstname"
                                  type="text"
                                  variant="outlined"
                                  value={firstname}
                                  onChange={(e) => setFirstname(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Lastname"
                                  variant="outlined"
                                  value={lastname}
                                  onChange={(e) => setLastname(e.target.value)}
                                />
                              </div>

                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  type="email"
                                  label="Email"
                                  value={email}
                                  variant="outlined"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Password"
                                  type="password"
                                  variant="outlined"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="confirm Password"
                                  type="password"
                                  variant="outlined"
                                  name="cPassword"
                                  onChange={(e) => setCPassword(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Address1"
                                  type="text"
                                  variant="outlined"
                                  value={address1}
                                  onChange={(e) => setAddress1(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Address2"
                                  type="text"
                                  variant="outlined"
                                  value={address2}
                                  onChange={(e) => setAddress2(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Address3"
                                  type="text"
                                  variant="outlined"
                                  value={address3}
                                  onChange={(e) => setAddress3(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Mobile:"
                                  type="number"
                                  variant="outlined"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <TextField
                                  className="ml-4 col-md-11 my-3 justify-content-center"
                                  label="Age:"
                                  type="number"
                                  variant="outlined"
                                  value={age}
                                  onChange={(e) => setAge(e.target.value)}
                                />
                              </div>
                              <div className="container col-md-15 justify-content-center">
                                <div className="my-5 justify-content-center">
                                  <Button
                                    className="ml-4 col-md-11 justify-content-center"
                                    style={{ background: "#557794" }}
                                    onClick={sendUpdateRequest}
                                  >
                                    Update Profile
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Container>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default Userprofile;
