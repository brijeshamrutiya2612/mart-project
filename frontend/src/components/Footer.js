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
        }}
      >
        <Navbar
          expand="lg"
          style={{ background: "#557794" }}
        >
          <Container>
            <Navbar.Brand className="container d-flex justify-content-center">
              <ShoppingBag
                sx={{ display: { xs: "none", md: "flex", color:"#FFFFFF" }, mr: 1 }}
              />
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
              color:"#FFFFFF"
            }}
          >
            MART
          </Typography>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Footer;
