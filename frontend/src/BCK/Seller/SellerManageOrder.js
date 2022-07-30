import React, { useContext, useEffect, useReducer, useState } from "react";
import { Col, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../store/Context";
import SellerSideBar from "./SellerSideBar";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        sellerorders: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
}

const SellerManageOrder = () => {
  const { state } = useContext(Store);
  const { sellerInfo } = state;
  const [{ loading, error, sellerorders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const [id, setId] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/sellerorders/mine`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    fetchdata();
  }, [sellerInfo]);

  return (
    <>
      {loading ? (
        <>
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        </>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="my-5">
          <Row>
            <Col md={2}>
              <SellerSideBar></SellerSideBar>
            </Col>
            <Col lg={8}>
              <div
                style={{
                  border: "none",
                  background: "#D8E4E6",
                  boxShadow: "5px 5px 15px #888888",
                  borderRadius: "20px",
                  width: "100%",
                  height: "100%",
                }}
                className="p-4"
              >
                <Table sx={{ width: 750 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell colSpan={2}>Item Description</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Delivered</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sellerorders.map((item, i) => {
                      return (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          {item.orderItems
                            .filter((itm) => {
                              if (itm.mnfName === sellerInfo.mnfName) {
                                console.log(itm.mnfName)
                                return itm;
                              }
                            })
                            .map((val, i) => {
                              return (
                                <>
                                  <TableRow>
                                    <TableCell
                                      align="left"
                                      style={{
                                        width: "100px",

                                        marginRight: "12px",
                                      }}
                                    >
                                      <p>{val.firstname}</p>
                                      <img
                                        style={{
                                          minWidth: "100px",
                                          maxWidth: "200px",
                                          width: "100px",
                                          height: "150px",
                                          float: "left",
                                          marginTop: "1em",
                                          marginRight: "12px",
                                        }}
                                        className="img-fluid"
                                        src={val.image}
                                        alt=""
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      <b>{item.itemName}</b>
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                          <TableCell align="left">
                            <span className="mx-2">
                              {item.isDelivered
                                ? item.deliveredAt.substring(0, 10)
                                : "No"}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            <span className="mx-2">
                              {item.isPaid
                                ? item.paidAt.substring(0, 10)
                                : "No"}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            {item.createdAt.substring(0, 10)}
                          </TableCell>
                          <TableCell align="right">
                            &#x20B9; {item.totalPrice.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default SellerManageOrder;
