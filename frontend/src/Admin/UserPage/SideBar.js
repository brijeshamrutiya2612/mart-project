import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

import { useContext, useState } from "react";
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
  const [onTrue, setOnTrue] = useState(false)
  const on = () =>{
    setOnTrue(true);
  }
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
    <div>
    <AppBar
     className="mt-5"
     sx={{ display: { md: 2 },}}
      style={{ boxShadow: "1px 1px 10px #343A40", background: "#557794" }}
    >
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <ShoppingBag sx={{ display: { xs: "none", md: 2 }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MART
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {filter.map((item) => (
                <MenuItem key={item._id} onClick={handleCloseNavMenu}>
                  <Typography
                    style={{ textTransform: "uppercase" }}
                    textAlign="center"
                  >
                    {item.itemCategory}
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <ShoppingBag sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MART
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Show Products">
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                value="products"
              >
                <Typography textAlign="center">Products</Typography>
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              style={{ marginLeft: "5em" }}
            >
              {/* {filter.map((item) => (
                <MenuItem key={item._id} onClick={handleCloseNavMenu}>
                  <Typography
                  style={{ textTransform: "uppercase" }}
                  textAlign="center"
                  >
                  <Link
                  to={`/search?itemCategory=${item.itemCategory}`}
                      style={{ color: "#000000" }}
                    >
                    {item.itemCategory}
                    </Link>
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
              </div>
    <div
      className="row"
      style={{ width: "100%", height: "100%", clear: "both" }}
    >
      
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
    </>
  );
};

export default SideBar;
