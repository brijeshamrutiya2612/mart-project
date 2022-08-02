import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Store } from "../store/Context";
import SellerSideBar from "./SellerSideBar";

const SellerHome = () => {
  const { state } = useContext(Store);
  const { sellerInfo } = state;

  return (
    <div className="my-5">
      <Row>
        <Col md={2}>
          <SellerSideBar></SellerSideBar>
        </Col>
        <Col lg={8}>
          <div
            style={{
              border: "none",
              borderRadius: "20px",
              width: "100%",
              height: "100%",
            }}
            className="p-4"
          >
            <Row>
              <Col sm={2}>
                <Typography className="p-1" variant="h6">
                  Seller:
                </Typography>
              </Col>
              <Col sm={5}>
                <Typography className="p-1" variant="h6">
                  {sellerInfo.firstname} {sellerInfo.lastname}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Typography className="p-1" variant="h6">
                  GSTIN No:
                </Typography>
              </Col>
              <Col sm={5}>
                <Typography className="p-1" variant="h6">
                  {sellerInfo.GSTIN}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Typography className="p-1" variant="h6">
                  PAN No:
                </Typography>
              </Col>
              <Col sm={5}>
                <Typography className="p-1" variant="h6">
                  {sellerInfo.PAN_NO}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Typography className="p-1" variant="h6">
                  Manufacturer:
                </Typography>
              </Col>
              <Col sm={5}>
                <Typography className="p-1" variant="h6">
                  {sellerInfo.mnfName}
                </Typography>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SellerHome;
