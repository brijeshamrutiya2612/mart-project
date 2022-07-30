import { Avatar, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../store/Context";

const SellerSideBar = () => {
  const { state } = useContext(Store);
  const { sellerInfo } = state;
  return (
    <div
      className="row col-lg"
      style={{ width:"100%", height: "100%", clear: "both" }}
    >
      <div className="p-3 col-lg">
        <div
          style={{
            border: "none",
            background: "#D8E4E6",
            boxShadow: "5px 5px 15px #888888",
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
              Home
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
              Profile
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
              Logout
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSideBar;
