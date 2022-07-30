import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const nav = useNavigate();
    const goDashboard = () => {
      nav("/productview");
    };
    const goAddproducts = () => {
      nav("/addproducts");
    };
    const goUsers = () => {
      nav("/productAction");
    };

    return (
      <div className="container col-lg-15 justify-content-center">
        <Button
          className="col-lg-3 mr-3 my-2"
          variant="outline-warning"
          onClick={goDashboard}
        >
          View
        </Button>
        <Button
          className="col-lg-4 mr-3 my-2"
          variant="outline-warning"
          onClick={goAddproducts}
        >
          Add
        </Button>
        <Button
          className="col-lg-3 mr-3 my-2"
          variant="outline-warning"
          onClick={goUsers}
        >
          Actions
        </Button>
      </div>
    );
  }

export default Header;
