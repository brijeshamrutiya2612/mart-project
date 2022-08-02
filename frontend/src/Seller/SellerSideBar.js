import { Avatar, Typography } from "@mui/material";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store/Context";

const SellerSideBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sellerInfo } = state;
  const nav = useNavigate();

  const handleLogout = () => {
    ctxDispatch({ type: "SELLER_SIGNOUT" });
    localStorage.removeItem("sellerInfo");
    nav("/Login");
  };

  return (
    <div
      className="row col-lg"
      style={{ width:"100%", height: "100%", clear: "both" }}
    >
      <div className="p-3 col-lg">
        <div
          style={{
            border: "none",
            borderRadius: "20px",
            height: "100%",
          }}
          className="p-4"
        >
          <Avatar
            className="mr-2"
            sx={{ background: "black", float: "left" }}
            alt={sellerInfo.firstname}
            src="/static/images/avatar/2.jpg"
          />
          <Typography className="p-1" variant="h6">
            {sellerInfo.firstname}
          </Typography>
          <div className="ml-1">
            <Typography style={{ paddingTop: "1em" }} variant="h6">
            <Link
                style={{ textDecoration: "none", color: "#000000" }}
                to="/SellerHome"
              >
              Home
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
            <Link
                style={{ textDecoration: "none", color: "#000000" }}
                to="/SellerManageOrder"
              >
              Order
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
            <Link
                style={{ textDecoration: "none", color: "#000000" }}
                to="/SellerProducts"
              >Products
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
              <Link
                style={{ textDecoration: "none", color: "#000000" }}
                to="/SellerAddProduct"
              >
                Add Product
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
            <Link
                style={{ textDecoration: "none", color: "#000000" }}
                to="/SellerProfile"
              >
              Profile
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
            <Button
              variant="light"
              style={{
                fontSize: "20px",
                color: "black",
                background:"white",
                border:"white",
              }}
              onClick={handleLogout}
            >
              Logout
              </Button>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSideBar;
