import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { Store } from "../store/Context";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import {Helmet} from "react-helmet"

const ShippingAddress = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState(userInfo.firstname || "");
  const [lastname, setLastname] = useState(userInfo.lastname || "");
  const [address1, setAddress1] = useState(userInfo.address1 || "");
  const [address2, setAddress2] = useState(userInfo.address2 || "");
  const [address3, setAddress3] = useState(userInfo.address3 || "");
  const [phone, setPhone] = useState(userInfo.phone || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const submitHandler = () => {
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        firstname,
        lastname,
        address1,
        address2,
        address3,
        phone,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        firstname,
        lastname,
        address1,
        address2,
        address3,
        phone,
      })
    );
    navigate("/Payment");
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>
      </div>
      <div
        style={{
          width: "auto",
          height: "auto",
        }}
      >
        <div className="container col-lg-8 pt-2 pb-3 justify-content-center">
        <CheckOutSteps step1 step2></CheckOutSteps>
          <h1 className="my-3">Shipping Address</h1>
          <div className="my-2">
            <form>
              <div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    label="Firstname"
                    style={{ backgroundColor: "white" }}
                    variant="outlined"
                    type="text"
                    name="//name.firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    style={{ backgroundColor: "white" }}
                    label="Lastname"
                    variant="outlined"
                    name="name.lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    style={{ backgroundColor: "white" }}
                    label="Address1"
                    type="text"
                    variant="outlined"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    style={{ backgroundColor: "white" }}
                    label="Address2"
                    type="text"
                    variant="outlined"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    style={{ backgroundColor: "white" }}
                    label="Address3"
                    type="text"
                    variant="outlined"
                    value={address3}
                    onChange={(e) => setAddress3(e.target.value)}
                  />
                </div>
                <div className="justify-content-center">
                  <TextField
                    className="col-md-8 my-3 justify-content-center"
                    style={{ backgroundColor: "white" }}
                    label="Mobile:"
                    type="number"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="text-left my-1">
            <Button style={{background:"#6897bb",border:"1px solid #6897bb"}} size="sm" onClick={submitHandler}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;

/* <Box
  className="mt-5"
  style={{
    backgroundColor: "ButtonFace",
    borderRadius: "20px",
    width: "auto",
    minWidth: "100px",
  }}
>
  <div className="p-3">
    <h4 className="my-1">Shipping Address</h4>
    <p>
      {userInfo.address1}
      <br />
      {userInfo && userInfo.address2}
      <br />
      {userInfo && userInfo.address3}
    </p>
  </div>
</Box>
<p
  className="text-left my-1"
  style={{
    float: "left",
    fontSize: "13px",
    marginLeft: "5px",
    marginRight: "5px",
  }}
>
  You Can Change Your Shipping Address
</p>
<div className="text-left my-1">
  <Button variant="success" size="sm" onClick={chngAdrs}>
    Change Address
  </Button>
</div>
{change ? (
  <>
    <h1>
      Hello
      <Button variant="success" size="sm" onClick={chngAdrs}>
        Change Address
      </Button>
    </h1>
  </>
) : null} */
