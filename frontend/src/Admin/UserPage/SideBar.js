import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { Store } from "../../store/Context";
import { Button } from "react-bootstrap";

const SideBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const nav = useNavigate();

  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    nav("/");
  };
  return (
    <div
      className="row"
      style={{ width: "100%", height: "100%", clear: "both" }}
    >
    <Box>
      <div className="p-3 col-lg-15">
        <div
          style={{
            border: "none",
            boxShadow: "5px 5px 15px #888888",
            borderRadius: "20px",
            height: "100%",
          }}
          className="p-4"
        >
          <Avatar
            className="mr-2"
            sx={{ background: "black", float: "left" }}
            alt={userInfo.firstname}
            src="/static/images/avatar/2.jpg"
          />
          <Typography className="p-1" variant="h6">
            {userInfo.firstname}
          </Typography>
          <div className="ml-1">
            <Typography style={{ paddingTop: "1em" }} variant="h6">
              <Link
                style={{
                  color: "black",
                  textDecorationLine:"none"
                }}
                to={`/ud/${userInfo._id}`}
              >
                <DashboardIcon />
                &#x2003;
                <strong>Dashboard</strong>
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
              <Link
                style={{
                  color: "black",
                  textDecorationLine:"none"
                }}
                to={`/user/${userInfo._id}`}
              >
                <PersonIcon />
                &#x2003;
                <strong>Profile</strong>
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
              <Link
                style={{
                  float: "right",
                  color: "black",
                  textDecorationLine:"none"
                }}
                to={`/u_purchase/${userInfo._id}`}
              >
                <HistoryIcon />
                &#x2003;
                <strong>Purchase History</strong>
              </Link>
            </Typography>
            <Typography style={{ paddingTop: "1.3em" }} variant="h6">
            <Button
              variant="light"
              style={{
                lineHeight: "1em",
                fontSize: "20px",
                color: "black",
                background:"white",
                border:"white",
                marginTop:"1em"
              }}
              onClick={handleLogout}
            >
              <LogoutIcon /> &#x2003;
              <strong>Logout</strong>
            </Button>
            </Typography>
          </div>
        </div>
      </div>
    </Box>
    </div>
  );
};

export default SideBar;
