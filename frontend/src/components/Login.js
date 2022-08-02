import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Store } from "../store/Context";
import { toast } from "react-toastify";

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
        width: "auto",
        height: "auto",
      }}
    >
      <div className="container pt-5 col-md-15 justify-content-center">
        <Container
          className="justify-content-center"
          style={{ overflow: "hidden" }}
        >
          <div className="my-4 pt-5 pl-5justify-content-center">
            <div
              className="container my-5 col-md-5 justify-content-center"
              style={{
                backgroundColor: "white",
                overflow: "hidden",
                boxShadow: "1px 1px 15px #343A40",
                borderRadius: "20px",
                height: "auto",
                opacity: 0.8,
              }}
            >
              <h2 className="container text-center" variant="contained">
                <ShoppingBag style={{ fontSize: "50px", color: "#48657c" }} />
              </h2>
              <h2 className="container my-4 text-center">Sign In</h2>

              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="col-md-11 my-3 justify-content-center"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  onChange={(e) =>
                    setEmail({ ...emails, email: e.target.value })
                  }
                />
              </div>
              <div className="container col-md-15 justify-content-center">
                <TextField
                  className="container col-md-11 justify-content-center"
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={(e) =>
                    setEmail({ ...emails, password: e.target.value })
                  }
                />
                <div className="container my-5 justify-content-center">
                  <Button
                    className="container col-md-11 justify-content-center"
                    variant="contained"
                    style={{ backgroundColor: "#557794" }}
                    onClick={handleSubmit}
                  >
                    LOGIN
                  </Button>
                </div>
                <p>
                  Not a member?{" "}
                  <Link
                    to={`/register?redirect=${redirect}`}
                    style={{ color: "#48657c" }}
                  >
                    Create Your Account
                  </Link>
                </p>
                <p>
                  You want sell your Product?{" "}
                  <Link
                    to={`/NewSellerRegister?redirect=${redirect}`}
                    style={{ color: "#48657c" }}
                  >
                    Create Seller Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;
