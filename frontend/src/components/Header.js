import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Store } from "../store/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//const pages = ["Products", "Pricing", "Blog"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { cart, userInfo, sellerInfo } = state;
  const nav = useNavigate();
  const [list, setList] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  // eslint-disable-next-line
  const [query, setSearch] = React.useState("");

  React.useEffect(() => {
    async function getAllStudent() {
      try {
        const listProduct = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/products"
        );
        setList(listProduct.data);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, []);
  useEffect(() => {
    const getUnique = (arr, index) => {
      const unique = list
        .map((e) => e[index])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e])
        .map((e) => arr[e]);

      return unique;
    };
    setFilter(getUnique(list, "itemCategory"));
  }, [list]);

  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    ctxDispatch({ type: "SELLER_SIGNOUT" });
    localStorage.removeItem("sellerInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/login";
  };
  // eslint-disable-next-line
  const home = () => {
    nav("/");
  };
  // eslint-disable-next-line
  const handleSearch = (e) => {
    e.preventDefault();
    nav(query ? `/search?query=${query}` : "/search");
  };
  return (
    <AppBar
      style={{ boxShadow: "1px 1px 10px #343A40", background: "#557794" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBag sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
                display: { xs: "flex", md: "none" },
              }}
            >
              {filter.map((item) => (
                <MenuItem key={item._id} onClick={handleCloseNavMenu}>
                  <Typography
                    style={{ textTransform: "uppercase" }}
                    textAlign="center"
                  >
                    {item.itemCategory}
                  </Typography>
                </MenuItem>
              ))}
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
              {filter.map((item) => (
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
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {userInfo ? (
              <>
                <Link to="/addToCart" className="pr-2">
                  <ShoppingCartOutlinedIcon style={{ color: "#FFFFFF" }} />
                  <span style={{ color: "#FFFFFF" }}>
                    {cart.cartItems.length}
                  </span>
                </Link>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={userInfo.firstname}
                      src="/static/images/avatar/2.jpg"
                    />
                    
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",  
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  style={{ marginLeft: "3em" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ color: "#000000" }}
                        to={`/ud/${userInfo._id}`}
                      >
                        Dashboard
                      </Link>
                    </Typography>
                  </MenuItem>
                  {/* <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link style={{ color: "#000000" }} to="/Login">
                        Switch To Seller
                      </Link>
                    </Typography>
                  </MenuItem> */}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : sellerInfo ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={sellerInfo.firstname}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  style={{ marginLeft: "3em" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ color: "#000000" }}
                        to='/SellerHome'
                      >
                        Dashboard
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Tooltip>
                <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  value="products"
                >
                  <Typography textAlign="center">
                    <Link style={{ color: "#FFFFFF" }} to="/login">
                      Login
                    </Link>
                  </Typography>
                </Button>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
