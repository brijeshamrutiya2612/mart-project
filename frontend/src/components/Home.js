import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { AppBar, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

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
      <div>
        <Helmet>
          <title>Welcome to MART</title>
        </Helmet>
        {loading ? (
          <div className="container pt-5">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : error ? (
          <div className="container pt-5">{error}</div>
        ) : (
          <>
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
                          <Carousel
                            fade
                            style={{
                              padding: "3em",
                            }}
                            activeIndex={index}
                            onSelect={handleSelect}
                          >
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
                                      style={{ height: "350px" }}
                                      src={item.image}
                                      alt={item.itemCategory}
                                    />
                                    <Carousel.Caption
                                      style={{ color: "black" }}
                                    >
                                      <h3>{item.itemName}</h3>
                                      <h3>{item.itemCategory.toUpperCase()}</h3>
                                    </Carousel.Caption>
                                  </Link>
                                </Carousel.Item>
                              );
                            })}
                          </Carousel>
                          <div className="ml-5 my-5">
                            <Typography
                              style={{ textAlign: "center" }}
                              variant="h4"
                            >
                              MEN
                            </Typography>
                          </div>
                          <div className="row">
                            {getProd
                              .filter((itm) => {
                                if (itm.itemCategory === "men") {
                                  return itm;
                                }
                              })
                              .map((val, i) => {
                                return (
                                  <>
                                    <div className="col-lg-15 ml-5 my-5">
                                      <Link key={i} to={`/Seller/${val._id}`}>
                                        <Card
                                          className="card card-item"
                                          key={i}
                                          style={{
                                            overflow: "hidden",
                                            width: "250px",
                                            maxWidth: "500px",
                                            background: "#FFFFFF",
                                            transitionDuration: "1s",
                                            border: "5px solid #BFD3E2",
                                          }}
                                        >
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  height: "200px",
                                                  minHeight: "170px",
                                                  width: "150px",
                                                  maxHeight: "550px",
                                                  marginTop: "1em",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Img
                                                  src={val.image}
                                                  style={{
                                                    maxHeight: "250px",
                                                    height: "auto",
                                                    width: "auto",
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
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Body
                                                  style={{
                                                    textAlign: "center",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemName.substring(
                                                      0,
                                                      20
                                                    )}
                                                  </Card.Title>
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Card.Title>
                                                  <Card.Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemCategory.toUpperCase()}
                                                  </Card.Text>
                                                  <Button
                                                    className="btn-sm btn-c"
                                                    variant="dark"
                                                  >
                                                    Shop now &#x2192;
                                                  </Button>
                                                </Card.Body>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card>
                                      </Link>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <div className="ml-5 my-5">
                            <Typography
                              style={{ textAlign: "center" }}
                              variant="h4"
                            >
                              WOMEN
                            </Typography>
                          </div>
                          <div className="row">
                            {getProd
                              .filter((itm) => {
                                if (itm.itemCategory === "women") {
                                  return itm;
                                }
                              })
                              .map((val, i) => {
                                return (
                                  <>
                                    <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                      <Link key={i} to={`/Seller/${val._id}`}>
                                        <Card
                                          className="card card-item"
                                          key={i}
                                          style={{
                                            overflow: "hidden",
                                            width: "250px",
                                            maxWidth: "500px",
                                            background: "#FFFFFF",
                                            transitionDuration: "1s",
                                            border: "5px solid #BFD3E2",
                                          }}
                                        >
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  height: "200px",
                                                  minHeight: "170px",
                                                  width: "150px",
                                                  maxHeight: "550px",
                                                  marginTop: "1em",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Img
                                                  src={val.image}
                                                  style={{
                                                    maxHeight: "250px",
                                                    height: "auto",
                                                    width: "auto",
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
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Body
                                                  style={{
                                                    textAlign: "center",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemName.substring(
                                                      0,
                                                      20
                                                    )}
                                                  </Card.Title>
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Card.Title>
                                                  <Card.Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemCategory.toUpperCase()}
                                                  </Card.Text>
                                                  <Button
                                                    className="btn-sm btn-c"
                                                    variant="dark"
                                                  >
                                                    Shop now &#x2192;
                                                  </Button>
                                                </Card.Body>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card>
                                      </Link>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <div className="ml-5 my-5">
                            <Typography
                              style={{ textAlign: "center" }}
                              variant="h4"
                            >
                              JEWELERY
                            </Typography>
                          </div>
                          <div className="row">
                            {getProd
                              .filter((itm) => {
                                if (itm.itemCategory === "jewelery") {
                                  return itm;
                                }
                              })
                              .map((val, i) => {
                                return (
                                  <>
                                    <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                      <Link key={i} to={`/Seller/${val._id}`}>
                                        <Card
                                          className="card card-item"
                                          key={i}
                                          style={{
                                            overflow: "hidden",
                                            width: "250px",
                                            maxWidth: "500px",
                                            background: "#FFFFFF",
                                            transitionDuration: "1s",
                                            border: "5px solid #BFD3E2",
                                          }}
                                        >
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  height: "200px",
                                                  minHeight: "170px",
                                                  width: "150px",
                                                  maxHeight: "550px",
                                                  marginTop: "1em",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Img
                                                  src={val.image}
                                                  style={{
                                                    maxHeight: "250px",
                                                    height: "auto",
                                                    width: "auto",
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
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Body
                                                  style={{
                                                    textAlign: "center",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemName.substring(
                                                      0,
                                                      20
                                                    )}
                                                  </Card.Title>
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Card.Title>
                                                  <Card.Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemCategory.toUpperCase()}
                                                  </Card.Text>
                                                  <Button
                                                    className="btn-sm btn-c"
                                                    variant="dark"
                                                  >
                                                    Shop now &#x2192;
                                                  </Button>
                                                </Card.Body>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card>
                                      </Link>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <div className="ml-5 my-5">
                            <Typography
                              style={{ textAlign: "center" }}
                              variant="h4"
                            >
                              SPORTS
                            </Typography>
                          </div>
                          <div className="row">
                            {getProd
                              .filter((itm) => {
                                if (itm.itemCategory === "Sports") {
                                  return itm;
                                }
                              })
                              .map((val, i) => {
                                return (
                                  <>
                                    <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                      <Link key={i} to={`/Seller/${val._id}`}>
                                        <Card
                                          className="card card-item"
                                          key={i}
                                          style={{
                                            overflow: "hidden",
                                            width: "250px",
                                            maxWidth: "500px",
                                            background: "#FFFFFF",
                                            transitionDuration: "1s",
                                            border: "5px solid #BFD3E2",
                                          }}
                                        >
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  height: "200px",
                                                  minHeight: "170px",
                                                  width: "150px",
                                                  maxHeight: "550px",
                                                  marginTop: "1em",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Img
                                                  src={val.image}
                                                  style={{
                                                    maxHeight: "250px",
                                                    height: "auto",
                                                    width: "auto",
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
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Body
                                                  style={{
                                                    textAlign: "center",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemName.substring(
                                                      0,
                                                      20
                                                    )}
                                                  </Card.Title>
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Card.Title>
                                                  <Card.Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemCategory.toUpperCase()}
                                                  </Card.Text>
                                                  <Button
                                                    className="btn-sm btn-c"
                                                    variant="dark"
                                                  >
                                                    Shop now &#x2192;
                                                  </Button>
                                                </Card.Body>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card>
                                      </Link>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <div className="ml-5 my-5">
                            <Typography
                              style={{ textAlign: "center" }}
                              variant="h4"
                            >
                              FOODS
                            </Typography>
                          </div>
                          <div className="row">
                            {getProd
                              .filter((itm) => {
                                if (itm.itemCategory === "Food") {
                                  return itm;
                                }
                              })
                              .map((val, i) => {
                                return (
                                  <>
                                    <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                      <Link key={i} to={`/Seller/${val._id}`}>
                                        <Card
                                          className="card card-item"
                                          key={i}
                                          style={{
                                            overflow: "hidden",
                                            width: "250px",
                                            maxWidth: "500px",
                                            background: "#FFFFFF",
                                            transitionDuration: "1s",
                                            border: "5px solid #BFD3E2",
                                          }}
                                        >
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  height: "200px",
                                                  minHeight: "170px",
                                                  width: "150px",
                                                  maxHeight: "550px",
                                                  marginTop: "1em",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Img
                                                  src={val.image}
                                                  style={{
                                                    maxHeight: "250px",
                                                    height: "auto",
                                                    width: "auto",
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
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Body
                                                  style={{
                                                    textAlign: "center",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemName.substring(
                                                      0,
                                                      20
                                                    )}
                                                  </Card.Title>
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Card.Title>
                                                  <Card.Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemCategory.toUpperCase()}
                                                  </Card.Text>
                                                  <Button
                                                    className="btn-sm btn-c"
                                                    variant="dark"
                                                  >
                                                    Shop now &#x2192;
                                                  </Button>
                                                </Card.Body>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card>
                                      </Link>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <div className="ml-5 my-5">
                            <Typography
                              style={{ textAlign: "center" }}
                              variant="h4"
                            >
                              ELECTRONICS
                            </Typography>
                          </div>
                          <div className="row">
                            {getProd
                              .filter((itm) => {
                                if (itm.itemCategory === "electronics") {
                                  return itm;
                                }
                              })
                              .map((val, i) => {
                                return (
                                  <>
                                    <div className="col-lg-15 ml-5 my-5 d-flex justify-content-center">
                                      <Link key={i} to={`/Seller/${val._id}`}>
                                        <Card
                                          className="card card-item"
                                          key={i}
                                          style={{
                                            overflow: "hidden",
                                            width: "250px",
                                            maxWidth: "500px",
                                            background: "#FFFFFF",
                                            transitionDuration: "1s",
                                            border: "5px solid #BFD3E2",
                                          }}
                                        >
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  height: "200px",
                                                  minHeight: "170px",
                                                  width: "150px",
                                                  maxHeight: "550px",
                                                  marginTop: "1em",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Img
                                                  src={val.image}
                                                  style={{
                                                    maxHeight: "250px",
                                                    height: "auto",
                                                    width: "auto",
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
                                                  textAlign: "center",
                                                }}
                                              >
                                                <Card.Body
                                                  style={{
                                                    textAlign: "center",
                                                    color: "black",
                                                  }}
                                                >
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemName.substring(
                                                      0,
                                                      20
                                                    )}
                                                  </Card.Title>
                                                  <Card.Title
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    &#x20B9; {val.itemPrice}
                                                  </Card.Title>
                                                  <Card.Text
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    {val.itemCategory.toUpperCase()}
                                                  </Card.Text>
                                                  <Button
                                                    className="btn-sm btn-c"
                                                    variant="dark"
                                                  >
                                                    Shop now &#x2192;
                                                  </Button>
                                                </Card.Body>
                                              </Col>
                                            </Row>
                                          </Container>
                                        </Card>
                                      </Link>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                        </>
                      ) : (
                        <div className="row" style={{ background: "#D8E4E6" }}>
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
                                      <div className="col-lg-15 ml-5 my-3 d-flex justify-content-center">
                                        <Link key={i} to={`/Seller/${val._id}`}>
                                          <Card
                                            className="card card-item"
                                            key={i}
                                            style={{
                                              overflow: "hidden",
                                              width: "250px",
                                              maxWidth: "500px",
                                              background: "#FFFFFF",
                                              transitionDuration: "1s",
                                              border: "5px solid #557794",
                                            }}
                                          >
                                            <Container>
                                              <Row>
                                                <Col
                                                  style={{
                                                    height: "200px",
                                                    minHeight: "170px",
                                                    width: "150px",
                                                    maxHeight: "550px",
                                                    marginTop: "1em",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <Card.Img
                                                    src={val.image}
                                                    style={{
                                                      maxHeight: "250px",
                                                      height: "auto",
                                                      width: "auto",
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
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <Card.Body
                                                    style={{
                                                      textAlign: "center",
                                                      color: "black",
                                                    }}
                                                  >
                                                    <Card.Title
                                                      style={{
                                                        textAlign: "center",
                                                        color: "black",
                                                      }}
                                                    >
                                                      {val.itemName.substring(
                                                        0,
                                                        20
                                                      )}
                                                    </Card.Title>
                                                    <Card.Title
                                                      style={{
                                                        textAlign: "center",
                                                        color: "black",
                                                      }}
                                                    >
                                                      &#x20B9; {val.itemPrice}
                                                    </Card.Title>
                                                    <Card.Text
                                                      style={{
                                                        textAlign: "center",
                                                        color: "black",
                                                      }}
                                                    >
                                                      {val.itemCategory.toUpperCase()}
                                                    </Card.Text>
                                                    <Button
                                                      className="btn-sm btn-c"
                                                      variant="dark"
                                                    >
                                                      Shop now &#x2192;
                                                    </Button>
                                                  </Card.Body>
                                                </Col>
                                              </Row>
                                            </Container>
                                          </Card>
                                        </Link>
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
          </>
        )}
      </div>
    </>
  );
}

export default Home;
