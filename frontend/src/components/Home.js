import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { AppBar, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import { Rating } from "react-simple-star-rating";
import Button from "@mui/material/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, getProd: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const [{ loading, error, getProd }, dispatch] = useReducer(reducer, {
    getProd: [],
    loading: true,
    error: "",
  });
  const [search, setSearch] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/products"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  // eslint-disable-next-line
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

  return (
    <>
      <div className="container col-lg-12">
        <Helmet>
          <title>Welcome to MART</title>
        </Helmet>
        {/* {loading ? (
          <Loading/>
        ) : error ? (
          <div className="container pt-5">{error}</div>
        ) : (
          <> */}
        <div>
          <div
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "auto",
              height: "auto",
            }}
          >
            <AppBar className="mt-5">
              <div
                className="my-4 p-2"
                style={{
                  position: "fixed",
                  width: "100%",
                }}
              >
                <div className="pt-2 pb-2" style={{}}>
                  <Form className="d-flex col-lg-3 mx-auto">
                    <Form.Control
                      type="search"
                      placeholder="Search by product, category..."
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
                </div>
              </div>
            </AppBar>
            <div style={{ marginTop: "7em" }} />
            <div className="my-4 mt-3">
              <div>
                <div className="container col-lg-12 mt-5">
                  {search == "" ? (
                    <>
                      {loading ? (
                        <>
                          <div className="container">
                            <Stack spacing={1} className="text-center">
                              <Skeleton variant="rectangular" height={520} />
                              <Skeleton
                                style={{ textAlign: "center" }}
                                variant="text"
                                width={100}
                              />
                              <Skeleton variant="text" width={100} />
                            </Stack>
                          </div>
                        </>
                      ) : (
                        <>
                          <Carousel activeIndex={index} onSelect={handleSelect}>
                            {getProd.map((item, i) => {
                              return (
                                <Carousel.Item
                                  key={i}
                                  style={{ height: "520px" }}
                                  interval={2000}
                                >
                                  <Link key={i} to={`/Seller/${item._id}`}>
                                    <img
                                      className="d-block pb-5 w-10 mx-auto text-center"
                                      style={{
                                        minWidth: "100px",
                                        maxWidth: "500px",
                                        height: "350px",
                                      }}
                                      src={item.image}
                                      alt={item.itemCategory}
                                    />
                                    <Carousel.Caption
                                      style={{ color: "black" }}
                                    >
                                      <Typography>{item.itemName}</Typography>
                                    </Carousel.Caption>
                                  </Link>
                                </Carousel.Item>
                              );
                            })}
                          </Carousel>
                        </>
                      )}
                      <Divider className="my-5" variant="middle" />
                      <div className="ml-5 my-5 pb-5">
                        <Typography
                          style={{ textAlign: "center" }}
                          variant="h3"
                        >
                          PRODUCTS
                        </Typography>
                      </div>
                      <div
                        className="container col-lg-10"
                        style={{ width: "100%" }}
                      >
                        <Row>
                          <Col md={6}>
                            <Typography
                              style={{ textAlign: "left" }}
                              variant="h3"
                              className="my-5"
                            >
                              <small>
                                <b>MEN</b>
                              </small>
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              All Items are available for MEN
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              Like, Shirts, Pents, T-Shirts, Watch, More
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              Branded Clothes and More
                            </Typography>
                            <Button variant="outlined" color="error">
                              <Link
                                to={`/search?itemCategory=men`}
                                style={{ color: "#000000" }}
                              >
                                Explore More
                              </Link>
                            </Button>
                          </Col>
                          <Col md={6}>
                            <div
                              style={{
                                boxShadow: "-16px -11px 11px -1px #B7BBBF",
                              }}
                            >
                              {loading ? (
                                <>
                                  <Stack spacing={1}>
                                    <Skeleton
                                      variant="rectangular"
                                      width={250}
                                      height={418}
                                    />
                                  </Stack>
                                </>
                              ) : error ? (
                                <div className="container pt-5">{error}</div>
                              ) : (
                                <>
                                  <div className="row">
                                    {getProd
                                      .filter((itm) => {
                                        if (itm.itemCategory === "men") {
                                          return itm;
                                        }
                                      })
                                      .slice(0, 4)
                                      .map((val, i) => {
                                        return (
                                          <>
                                            <div className="col-lg-15 ml-5 my-5">
                                              <Card
                                                className="card card-item"
                                                key={i}
                                                style={{
                                                  overflow: "hidden",
                                                  width: "300px",
                                                  maxWidth: "500px",
                                                  transitionDuration: "1s",
                                                  border: "none",
                                                }}
                                              >
                                                <Container>
                                                  <Row>
                                                    <Col
                                                      style={{
                                                        height: "130px",
                                                        minHeight: "170px",
                                                        width: "250px",
                                                        maxHeight: "550px",
                                                        marginTop: "1em",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <Card.Img
                                                        src={val.image}
                                                        style={{
                                                          width: "auto",
                                                          height: "170px",
                                                          maxWidth: "500px",
                                                          minWidth: "100px",
                                                          textAlign: "center",
                                                        }}
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Container>
                                              </Card>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Divider className="my-4 pt-5 pb-5" variant="middle" />
                      <div
                        className="container col-lg-10 my-5"
                        style={{ width: "100%" }}
                      >
                        <Row>
                          <Col md={6}>
                            <div
                              style={{
                                boxShadow: "16px -10px 11px -1px #B7BBBF",
                              }}
                            >
                              {loading ? (
                                <>
                                  <Stack spacing={1}>
                                    <Skeleton
                                      variant="rectangular"
                                      width={250}
                                      height={418}
                                    />
                                  </Stack>
                                </>
                              ) : error ? (
                                <div className="container pt-5">{error}</div>
                              ) : (
                                <>
                                  <div className="row">
                                    {getProd
                                      .filter((itm) => {
                                        if (itm.itemCategory === "women") {
                                          return itm;
                                        }
                                      })
                                      .slice(0, 4)
                                      .map((val, i) => {
                                        return (
                                          <>
                                            <div className="col-lg-15 ml-5 my-5">
                                              <Card
                                                className="card card-item"
                                                key={i}
                                                style={{
                                                  overflow: "hidden",
                                                  width: "300px",
                                                  maxWidth: "500px",
                                                  transitionDuration: "1s",
                                                  border: "none",
                                                }}
                                              >
                                                <Container>
                                                  <Row>
                                                    <Col
                                                      style={{
                                                        height: "130px",
                                                        minHeight: "170px",
                                                        width: "250px",
                                                        maxHeight: "550px",
                                                        marginTop: "1em",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <Card.Img
                                                        src={val.image}
                                                        style={{
                                                          width: "auto",
                                                          height: "170px",
                                                          maxWidth: "500px",
                                                          minWidth: "100px",
                                                          textAlign: "center",
                                                        }}
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Container>
                                              </Card>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                            </div>
                          </Col>
                          <Col md={6} style={{ textAlign: "right" }}>
                            <Typography
                              style={{ textAlign: "right" }}
                              className="my-5"
                              variant="h3"
                            >
                              <small>
                                <b>WOMEN</b>
                              </small>
                            </Typography>
                            <Typography className="my-3" variant="h6">
                              All Items are available for WOMEN
                            </Typography>
                            <Typography className="my-3" variant="h6">
                              Like, Shirts, Pents, T-Shirts, Watch, More
                            </Typography>
                            <Typography className="my-3" variant="h6">
                              Branded Clothes and More
                            </Typography>
                            <Button variant="outlined" color="error">
                            <Link
                                to={`/search?itemCategory=women`}
                                style={{ color: "#000000" }}
                              >
                                Explore More
                              </Link>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <Divider className="my-4 pt-5 pb-5" variant="middle" />
                      <div
                        className="container col-lg-10 my-5"
                        style={{ width: "100%" }}
                      >
                        <Row>
                          <Col md={6}>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-5"
                              variant="h3"
                            >
                              <small>
                                <b>JWELLERY</b>
                              </small>
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              All Types of Jweller available
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              Like Dimond set, Gold Hwellery, Rose Gold
                              Jwellery, More
                            </Typography>
                            <Button variant="outlined" color="error">
                            <Link
                                to={`/search?itemCategory=jewelery`}
                                style={{ color: "#000000" }}
                              >
                                Explore More
                              </Link>
                            </Button>
                          </Col>
                          <Col md={6}>
                            <div
                              style={{
                                boxShadow: "-16px -11px 11px -1px #B7BBBF",
                              }}
                            >
                              {loading ? (
                                <>
                                  <Stack spacing={1}>
                                    <Skeleton
                                      variant="rectangular"
                                      width={250}
                                      height={418}
                                    />
                                  </Stack>
                                </>
                              ) : error ? (
                                <div className="container pt-5">{error}</div>
                              ) : (
                                <>
                                  <div className="row">
                                    {getProd
                                      .filter((itm) => {
                                        if (itm.itemCategory === "jewelery") {
                                          return itm;
                                        }
                                      })
                                      .slice(0, 4)
                                      .map((val, i) => {
                                        return (
                                          <>
                                            <div className="col-lg-15 ml-5 my-5">
                                              <Card
                                                className="card card-item"
                                                key={i}
                                                style={{
                                                  overflow: "hidden",
                                                  width: "300px",
                                                  maxWidth: "500px",
                                                  transitionDuration: "1s",
                                                  border: "none",
                                                }}
                                              >
                                                <Container>
                                                  <Row>
                                                    <Col
                                                      style={{
                                                        height: "130px",
                                                        minHeight: "170px",
                                                        width: "250px",
                                                        maxHeight: "550px",
                                                        marginTop: "1em",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <Card.Img
                                                        src={val.image}
                                                        style={{
                                                          width: "auto",
                                                          height: "170px",
                                                          maxWidth: "500px",
                                                          minWidth: "100px",
                                                          textAlign: "center",
                                                        }}
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Container>
                                              </Card>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Divider className="my-4 pt-5 pb-5" variant="middle" />
                      <div
                        className="container col-lg-10 my-5"
                        style={{ width: "100%" }}
                      >
                        <Row>
                          <Col md={6}>
                            <div
                              style={{
                                boxShadow: "16px -10px 11px -1px #B7BBBF",
                              }}
                            >
                              {loading ? (
                                <>
                                  <Stack spacing={1}>
                                    <Skeleton
                                      variant="rectangular"
                                      width={250}
                                      height={418}
                                    />
                                  </Stack>
                                </>
                              ) : error ? (
                                <div className="container pt-5">{error}</div>
                              ) : (
                                <>
                                  <div className="row">
                                    {getProd
                                      .filter((itm) => {
                                        if (itm.itemCategory === "Food") {
                                          return itm;
                                        }
                                      })
                                      .slice(0, 4)
                                      .map((val, i) => {
                                        return (
                                          <>
                                            <div className="col-lg-15 ml-5 my-5">
                                              <Card
                                                className="card card-item"
                                                key={i}
                                                style={{
                                                  overflow: "hidden",
                                                  width: "300px",
                                                  maxWidth: "500px",
                                                  transitionDuration: "1s",
                                                  border: "none",
                                                }}
                                              >
                                                <Container>
                                                  <Row>
                                                    <Col
                                                      style={{
                                                        height: "100px",
                                                        minHeight: "170px",
                                                        width: "250px",
                                                        maxHeight: "550px",
                                                        marginTop: "1em",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <Card.Img
                                                        src={val.image}
                                                        style={{
                                                          width: "auto",
                                                          height: "170px",
                                                          maxWidth: "500px",
                                                          minWidth: "100px",
                                                          textAlign: "center",
                                                        }}
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Container>
                                              </Card>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                            </div>
                          </Col>
                          <Col md={6} style={{ textAlign: "right" }}>
                            <Typography
                              style={{ textAlign: "right" }}
                              className="my-5"
                              variant="h3"
                            >
                              <small>
                                <b>FOOD</b>
                              </small>
                            </Typography>
                            <Typography
                              style={{ textAlign: "right" }}
                              className="my-3"
                              variant="h6"
                            >
                              Branded Biscuit, and Other Food Items in Minimum
                              Price
                            </Typography>
                            <Typography
                              style={{ textAlign: "right" }}
                              className="my-3"
                              variant="h6"
                            >
                              And Also Drinks are available inside
                            </Typography>
                            <Button variant="outlined" color="error">
                            <Link
                                to={`/search?itemCategory=Food`}
                                style={{ color: "#000000" }}
                              >
                                Explore More
                              </Link>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <Divider className="my-4 pt-5 pb-5" variant="middle" />
                      <div
                        className="container col-lg-10 my-5"
                        style={{ width: "100%" }}
                      >
                        <Row>
                          <Col md={6}>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-5"
                              variant="h3"
                            >
                              <small>
                                <b>SPORTS</b>
                              </small>
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              All Items are available for MEN and WOMEN
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              Like, Shirts, Pents, T-Shirts, Watch, More
                            </Typography>
                            <Typography
                              style={{ textAlign: "left" }}
                              className="my-3"
                              variant="h6"
                            >
                              Branded Clothes and More
                            </Typography>
                            <Button variant="outlined" color="error">
                            <Link
                                to={`/search?itemCategory=Sports`}
                                style={{ color: "#000000" }}
                              >
                                Explore More
                              </Link>
                            </Button>
                          </Col>
                          <Col md={6}>
                            <div
                              style={{
                                boxShadow: "-16px -11px 11px -1px #B7BBBF",
                              }}
                            >
                              {loading ? (
                                <>
                                  <Stack spacing={1}>
                                    <Skeleton
                                      variant="rectangular"
                                      width={250}
                                      height={418}
                                    />
                                  </Stack>
                                </>
                              ) : error ? (
                                <div className="container pt-5">{error}</div>
                              ) : (
                                <>
                                  <div className="row">
                                    {getProd
                                      .filter((itm) => {
                                        if (itm.itemCategory === "Sports") {
                                          return itm;
                                        }
                                      })
                                      .slice(0, 4)
                                      .map((val, i) => {
                                        return (
                                          <>
                                            <div className="col-lg-15 ml-5 my-5">
                                              <Card
                                                className="card card-item"
                                                key={i}
                                                style={{
                                                  overflow: "hidden",
                                                  width: "300px",
                                                  maxWidth: "500px",
                                                  transitionDuration: "1s",
                                                  border: "none",
                                                }}
                                              >
                                                <Container>
                                                  <Row>
                                                    <Col
                                                      style={{
                                                        height: "130px",
                                                        minHeight: "170px",
                                                        width: "250px",
                                                        maxHeight: "550px",
                                                        marginTop: "1em",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <Card.Img
                                                        src={val.image}
                                                        style={{
                                                          width: "auto",
                                                          height: "170px",
                                                          maxWidth: "500px",
                                                          minWidth: "100px",
                                                          textAlign: "center",
                                                        }}
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Container>
                                              </Card>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Divider className="my-4 pt-5 pb-5" variant="middle" />
                      <div
                        className="container col-lg-10 my-5"
                        style={{ width: "100%" }}
                      >
                        <Row>
                          <Col md={6}>
                            <div
                              style={{
                                boxShadow: "16px -10px 11px -1px #B7BBBF",
                              }}
                            >
                              {loading ? (
                                <>
                                  <Stack spacing={1}>
                                    <Skeleton
                                      variant="rectangular"
                                      width={250}
                                      height={418}
                                    />
                                  </Stack>
                                </>
                              ) : error ? (
                                <div className="container pt-5">{error}</div>
                              ) : (
                                <>
                                  <div className="row">
                                    {getProd
                                      .filter((itm) => {
                                        if (
                                          itm.itemCategory === "electronics"
                                        ) {
                                          return itm;
                                        }
                                      })
                                      .slice(0, 4)
                                      .map((val, i) => {
                                        return (
                                          <>
                                            <div className="col-lg-15 ml-5 my-5">
                                              <Card
                                                className="card card-item"
                                                key={i}
                                                style={{
                                                  overflow: "hidden",
                                                  width: "300px",
                                                  maxWidth: "500px",
                                                  transitionDuration: "1s",
                                                  border: "none",
                                                }}
                                              >
                                                <Container>
                                                  <Row>
                                                    <Col
                                                      style={{
                                                        height: "130px",
                                                        minHeight: "170px",
                                                        width: "250px",
                                                        maxHeight: "550px",
                                                        marginTop: "1em",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <Card.Img
                                                        src={val.image}
                                                        style={{
                                                          width: "auto",
                                                          height: "170px",
                                                          maxWidth: "500px",
                                                          minWidth: "100px",
                                                          textAlign: "center",
                                                        }}
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Container>
                                              </Card>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                            </div>
                          </Col>
                          <Col md={6} style={{ textAlign: "right" }}>
                            <Typography
                              style={{ textAlign: "right" }}
                              className="my-5"
                              variant="h3"
                            >
                              <small>
                                <b>ELECTRONICS</b>
                              </small>
                            </Typography>
                            <Typography className="my-3" variant="h6">
                              All Branded Electronics Items
                            </Typography>
                            <Typography className="my-3" variant="h6">
                              Like, Tv, Refrigator, AC, More
                            </Typography>
                            <Typography className="my-3" variant="h6">
                              Branded AV and More
                            </Typography>
                            <Button variant="outlined" color="error">
                            <Link
                                to={`/search?itemCategory=electronics`}
                                style={{ color: "#000000" }}
                              >
                                Explore More
                              </Link>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <Divider className="my-4 pt-5 pb-5" variant="middle" />
                    </>
                  ) : (
                    <div className="row">
                      {getProd
                        .filter((itm) => {
                          if (search == "") {
                            return itm;
                          } else if (
                            itm.itemName
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            let final = [{ itm }];
                            return final;
                          } else if (
                            itm.itemCategory
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            let final = [{ itm }];
                            return final;
                          }
                        })
                        .map((val, i) => {
                          console.log(val);
                          return (
                            <>
                              {val ? (
                                <>
                                  <div className="col-lg-15 ml-5 my-5">
                                    <Card
                                      className="card card-item"
                                      key={i}
                                      style={{
                                        overflow: "hidden",
                                        width: "300px",
                                        maxWidth: "500px",
                                        transitionDuration: "1s",
                                        border: "none",
                                      }}
                                    >
                                      <Container>
                                        <Row>
                                          <Col
                                            style={{
                                              height: "130px",
                                              minHeight: "170px",
                                              width: "250px",
                                              maxHeight: "550px",
                                              marginTop: "1em",
                                              textAlign: "center",
                                            }}
                                          >
                                            <Card.Img
                                              src={val.image}
                                              style={{
                                                height: "220px",
                                                width: "150px",
                                                maxWidth: "200px",
                                                textAlign: "center",
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-5">
                                          <Col
                                            style={{
                                              height: "200px",
                                              textAlign: "left",
                                            }}
                                          >
                                            <Link
                                              key={i}
                                              to={`/Seller/${val._id}`}
                                            >
                                              <Card.Body
                                                style={{
                                                  textAlign: "left",
                                                  color: "black",
                                                }}
                                              >
                                                <Card.Title
                                                  style={{
                                                    textAlign: "left",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Typography
                                                    style={{
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {val.itemName
                                                      .toUpperCase()
                                                      .substring(0, 20)}
                                                  </Typography>
                                                  <Rating
                                                    style={{
                                                      textAlign: "left",
                                                      color: "black",
                                                    }}
                                                    ratingValue={
                                                      val.rating * 20
                                                    }
                                                    fillColor="#F68773"
                                                    size={15}
                                                  />
                                                </Card.Title>
                                                <Card.Title
                                                  style={{
                                                    textAlign: "left",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Typography
                                                    style={{
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Typography>
                                                </Card.Title>
                                                <Card.Text
                                                  style={{
                                                    textAlign: "left",
                                                    color: "tomato",
                                                  }}
                                                >
                                                  <small>ADD TO CART</small>{" "}
                                                  &#x2192;
                                                </Card.Text>
                                              </Card.Body>
                                            </Link>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </Card>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                    <p>Not Product Found</p>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </>
        )} */}
      </div>
    </>
  );
}

export default Home;
