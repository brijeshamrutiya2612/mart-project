import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Store } from "../store/Context";
import { toast } from "react-toastify";
import forgot from "../Images/Lovepik_com-450092369-illustration of forgot password flat design.png"

const Login = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [emails, setEmail] = useState({
    email: "",
    password: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      nav(redirect);
    }
  }, [nav, redirect, userInfo]);

  const handleSubmit = async (e) => {
    const user = await axios.get(
      "https://shopping-mart-react-app.herokuapp.com/api/users"
    );
    const userData = user.data.users;

    const checkUserEmail = userData.find((e) => {
      return e.email === emails.email;
    });

    const seller = await axios.get(
      "https://shopping-mart-react-app.herokuapp.com/api/seller/sellerlogin"
    );
    const sellerData = seller.data.sellers;

    const checkSellerEmail = sellerData.filter((e) => {
      return e.email === emails.email;
    });

    e.preventDefault();
    const { email, password } = emails;

    if (email === "") {
      toast.error("Email Is Required");
    } else if (email.length < 3) {
      toast.error("Invalid Email");
    } else if (password === "") {
      toast.error("Password Is Required");
    }

    if (checkUserEmail) {
      try {
        const res = await axios.post(
          "https://shopping-mart-react-app.herokuapp.com/api/login",
          {
            email: emails.email,
            password: emails.password,
          }
        );
        const data = await res.data;
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        nav(redirect || "/");
        return data;
      } catch (err) {
        toast.error("Some Problem With Login");
      }
    } else if (checkSellerEmail) {
      try {
        const res = await axios.post(
          "https://shopping-mart-react-app.herokuapp.com/api/seller/login",
          {
            email: emails.email,
            password: emails.password,
          }
        );
        const data = await res.data;
        ctxDispatch({ type: "SELLER_SIGNIN", payload: data });
        localStorage.setItem("sellerInfo", JSON.stringify(data));
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
        nav("/SellerHome");
        return data;
      } catch (err) {
        toast.error("Some Problem With Login");
      }
    } else {
      toast.error("Invalid email or password");
    }

    //sendRequest().then((data)=>localStorage.setItem("userId", data._id)).then(()=>dispatch(loginActions.login())).then(()=>nav("/")).then(data=>console.log(data))
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="container pt-5">
        <div className="container pt-5">
          <div className="container pt-5">
            <Row>
              <Col md={6} style={{backgroundColor:"#FE6684",boxShadow: "-18px -6px 35px -2px #B7BBBF"}}>
                <Typography
                  className="text-center justify-content-center pt-5"
                  variant="h4"
                >
                  <img style={{width:"100%"}} src={forgot} alt="login"/>
                </Typography>
              </Col>
              <Col
                lg={6}
                style={{
                  boxShadow: "15px -3px 35px -5px #B7BBBF",
                }}
              >
                <div className="container p-5">
                  <Typography className="my-4" variant="h4">
                    Forgot Password
                  </Typography>
                  <TextField
                    className="my-3 col-md-12 justify-content-center"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e) =>
                      setEmail({ ...emails, email: e.target.value })
                    }
                  />
                  <div className="my-5 justify-content-center">
                    <Button
                      className="col-md-12 justify-content-center"
                      variant="outlined"
                      style={{backgroundColor:"#FE6684",border:"#FE6684",color:"#FFFFFF",borderRadius:"0px",borderBlockColor:"#FE6684"}}
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
