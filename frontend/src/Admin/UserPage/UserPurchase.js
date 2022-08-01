import React, { useContext, useEffect, useReducer, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Store } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Col, FormLabel, Row, Spinner } from "react-bootstrap";
import { Button, Typography } from "@mui/material";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
}
const UserPurchase = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const [id, setId] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `https://shopping-mart-react-app.herokuapp.com/api/orders/mine`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    fetchdata();
    const fetchProductId = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`https://shopping-mart-react-app.herokuapp.com/api/products`);
        setId(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductId();
  }, [userInfo]);

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
        <>
          <div className="my-5">
            <Row>
              <Col md={2}>
                <SideBar></SideBar>
              </Col>
              <Col lg={10}>
                <div className="col-lg-11">
                  <Typography variant="h5">
                    History of Purchase Products
                  </Typography>
                    <p>*Some Products are you buyed but can't buy in recently, Because It Products are currently not available</p>
                  <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Item Description</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Delivery</TableCell>
                            <TableCell>Tax</TableCell>
                            <TableCell>Total (+Shipping Charge)</TableCell>
                            <TableCell>Grand Total</TableCell>
                          </TableRow>
                        </TableHead>
                        {loading ? (
                          <>
                            <div className="container pt-5">
                              <Spinner
                                animation="border"
                                role="status"
                              ></Spinner>
                            </div>
                          </>
                        ) : error ? (
                          <div>{error}</div>
                        ) : (
                          <TableBody>
                            {orders
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row, i) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                    style={{ verticalAlign: "top" }}
                                  >
                                    <TableCell>
                                      {row.orderItems.map((item, i) => {
                                        return (
                                          <>
                                            <TableRow rowsPan="2">
                                              <TableCell
                                                style={{ borderBottom: "none" }}
                                              >
                                                <img
                                                  style={{
                                                    width: "100px",
                                                  }}
                                                  src={item.image}
                                                />
                                              </TableCell>
                                              <TableRow
                                                style={{ borderBottom: "none" }}
                                              >
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    <b>Name:</b>
                                                  </Typography>
                                                </TableCell>
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    <b>Price:</b>
                                                  </Typography>
                                                </TableCell>
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    <b>Manufacture:</b>
                                                  </Typography>
                                                </TableCell>
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    <b>Item Qty:</b>
                                                  </Typography>
                                                </TableCell>
                                              </TableRow>
                                              <TableRow
                                                style={{ verticalAlign: "top" }}
                                              >
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                    width: "50px",
                                                  }}
                                                >
                                                  <Typography>
                                                    {item.itemName}
                                                  </Typography>
                                                </TableCell>
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    &#x20B9; {item.itemPrice}
                                                  </Typography>
                                                </TableCell>
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    {item.mnfName
                                                      ? item.mnfName
                                                      : "MART Product"}
                                                  </Typography>
                                                </TableCell>
                                                <TableCell
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  <Typography>
                                                    {item.quantity}
                                                  </Typography>
                                                </TableCell>
                                              </TableRow>
                                              <TableRow>
                                                <TableCell
                                                  colSpan={4}
                                                  style={{
                                                    borderBottom: "none",
                                                  }}
                                                >
                                                  {id
                                                    .filter((h, i) => {
                                                      if (
                                                        h._id === item.product
                                                      ) {
                                                        return h;
                                                      }
                                                    })
                                                    .map((g, i) => {
                                                      return (
                                                        <>
                                                            <Button
                                                              variant="contained"
                                                              color="warning"
                                                            >
                                                              <Link
                                                                style={{
                                                                  color:
                                                                    "white",
                                                                }}
                                                                to={`/seller/${g._id}`}
                                                              >
                                                                Buy
                                                              </Link>
                                                            </Button>
                                                        </>
                                                      );
                                                    })}
                                                </TableCell>
                                              </TableRow>
                                            </TableRow>
                                          </>
                                        );
                                      })}
                                    </TableCell>
                                    <TableCell>
                                      {row.isPaid === false ? (
                                        <Typography style={{ color: "red" }}>
                                          Payment Peding
                                        </Typography>
                                      ) : (
                                        <>
                                          <Typography
                                            style={{ color: "green" }}
                                          >
                                            Payment Done{" "}
                                          </Typography>{" "}
                                          via {row.paymentMethod}
                                        </>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {row.isDelivered === false ? (
                                        <Typography style={{ color: "red" }}>
                                          Delivery Peding
                                        </Typography>
                                      ) : (
                                        <Typography style={{ color: "green" }}>
                                          Payment Done
                                        </Typography>
                                      )}
                                      <TableRow>
                                        <TableCell
                                          style={{
                                            verticalAlign: "top",
                                            borderBottom: "none",
                                          }}
                                        >
                                          Address
                                        </TableCell>
                                        <TableCell
                                          style={{
                                            verticalAlign: "top",
                                            borderBottom: "none",
                                          }}
                                        >
                                          {row.shippingAddress.firstname +
                                            " " +
                                            row.shippingAddress.lastname}
                                          <br />
                                          {row.shippingAddress.phone}
                                          <br />
                                          {row.shippingAddress.address1}
                                          <br />
                                          {row.shippingAddress.address2}
                                          <br />
                                          {row.shippingAddress.address3}
                                          <br />
                                        </TableCell>
                                      </TableRow>
                                    </TableCell>
                                    <TableCell>
                                      {Math.ceil(row.taxPrice)}
                                    </TableCell>
                                    <TableCell>
                                      {Math.ceil(row.itemPrice) +
                                        " " +
                                        (row.shippingPrice > 0
                                          ? "+" + row.shippingPrice
                                          : "")}
                                    </TableCell>
                                    <TableCell>
                                      {Math.ceil(row.totalPrice)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={orders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};
// {id
//   .filter((t) => {
//     if (t._id === val._id) {
//       return t;
//     }
//   })
//   .map((im, i) => {
export default UserPurchase;
