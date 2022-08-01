import React, { useContext, useEffect, useReducer, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import axios from "axios";
import { Paper, styled } from "@mui/material";
import { Store } from "../../store/Context";
import SideBar from "./SideBar";

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

const Userdashboard = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
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
  }, [userInfo]);

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    backgroundColor: "white",
    overflow: "hidden",
    boxShadow: "1px 1px 15px #343A40",
    opacity: 0.8,
    marginLeft: "2em",
    marginTop: "1em",
    padding: "2em",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      {loading ? (
        <div className="container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="my-5">
          <Row>
            <Col md={2}>
              <SideBar></SideBar>
            </Col>
            <Col lg={10}>
              <div className="col-lg-11">
                <Typography variant="h4">Dashboard</Typography>
                <Typography variant="h5" className="my-4">
                  Profile Summary
                </Typography>
                <TableContainer component={Paper} className="container">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <strong>
                            {userInfo.firstname} {userInfo.lastname}
                          </strong>
                          <br />
                          {userInfo.address1}
                          <br />
                          {userInfo.address2}
                          <br />
                          {userInfo.address3}
                        </TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h5" className="my-4">
                  Orders Summary
                </Typography>
                <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}>
                  <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell colSpan={2}>Products Brief</TableCell>
                          <TableCell>Product Price</TableCell>
                        </TableRow>
                      </TableHead>
                        <TableBody>
                          {orders
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, i) => {
                              return (
                                <>
                                    {row.orderItems.map((item, i) => {
                                      return (
                                        <>
                                          <TableRow>
                                          <TableCell
                                              style={{ borderBottom: "none" }}
                                            >{i+1}</TableCell>
                                          
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
                                            <TableCell
                                                style={{
                                                  borderBottom: "none",
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
                                          </TableRow>
                                        </>
                                      );
                                    })}
                                 </>
                              );
                            })}
                        </TableBody>
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
      )}
    </>
  );
};

export default Userdashboard;
