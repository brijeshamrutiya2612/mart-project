import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Typography } from "@mui/material";

function Footer() {
  const nav = useNavigate();
  const home = () => {
    nav("/");
  };

  return (
    <div id="myHeader" className="mt-2">
      <div
        style={{
          minWidth: "100px",
          //   maxWidth:"500px",
          width: "100%",
          backgroundColor: "#fff",
          height: "52px",
          marginTop: "1em",
          position: "absolute",
          textAlign:"center"
        }}
      >
        <Navbar
          expand="lg"
          style={{ boxShadow: "-1px -7px 18px -6px #343A40" }}
        >
          <Container>
            <Navbar.Brand className="container d-flex justify-content-center">
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  color: "#000000",
                }}
                >
                &copy; 2022
              </Typography>
              <ShoppingBag sx={{display: { xs: "none", md: "flex" },fontSize:"30px",}}/>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontSize:"20px",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  color: "#000000",
                }}
              >
                MART
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontSize:"20px",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  color: "#000000",
                }}
              >
                All right reserved
              </Typography>
              </Navbar.Brand>
             
            <Navbar.Brand className="container d-flex">
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontSize:"10px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  color: "#000000",
                }}
                >
                &copy; 2022 
              </Typography>
              <ShoppingBag sx={{display: { xs: "flex", md: "none" },fontSize:"15px",}}/>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontSize:"10px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  color: "#000000",
                }}
              >
                MART
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontSize:"10px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  color: "#000000",
                }}
              >
              All right reserved
              </Typography>
              </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Footer;
