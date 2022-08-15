import { Typography } from "@mui/material";
import * as React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Admin() {
  const nav = useNavigate();
  const goDashboard = () =>{
    nav("/dashboard");
  }
  const goAddproducts = () =>{
    nav("/productview");
  }
  const goAccounts = () =>{
    nav("/Accounts");
  }
  const goOrders = () =>{
    nav("/Orders");
  }

  return (
    <div style={{height:"auto",background:"cover",width:"auto"}} className="container col-lg-15 my-4 justify-content-center">
      <Typography className="container my-4 text-left" variant="h4">Admin</Typography>
      <Button className="col-lg-2 mr-3 my-2" variant="success" onClick={goDashboard}>Dashboard</Button>
      <Button className="col-lg-3 mr-3 my-2" variant="success" onClick={goAddproducts}>Products</Button>
      <Button className="col-lg-2 mr-3 my-2" variant="success" onClick={goAccounts}>Accounts</Button>
      <Button className="col-lg-2 mr-3 my-2" variant="success" onClick={goOrders}>Orders</Button>
    </div>
  );
}

export default Admin;
