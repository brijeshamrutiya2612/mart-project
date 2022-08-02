import { CurrencyRupee } from "@mui/icons-material";
import { AppBar, Skeleton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import "./Home.css";
import RatingStart from "./RatingStart";
import { Rating } from "react-simple-star-rating";
import Loading from "./Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$100 to $500",
    value: "100-500",
  },
  {
    name: "$500 to $1000",
    value: "500-1000",
  },
  {
    name: "$1000 to $5000",
    value: "1000-5000",
  },
  {
    name: "$5000 to Above",
    value: "5000-100000 ",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    value: 4,
  },

  {
    name: "3stars & up",
    value: 3,
  },

  {
    name: "2stars & up",
    value: 2,
  },

  {
    name: "1stars & up",
    value: 1,
  },
];

const Search = () => {
  const navigate = useNavigate();
  const [searching, setSearch] = useState([]);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const itemCategory = sp.get("itemCategory") || "all";
  const itemPrice = sp.get("itemPrice") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "all";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      getProd: [],
      loading: true,
      error: "",
    });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://shopping-mart-react-app.herokuapp.com/api/products/search?page=${page}&query=${searching}&itemCategory=${itemCategory}&itemPrice=${itemPrice}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
    console.log(searching);
  }, [itemCategory, error, order, page, itemPrice, searching, rating]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/products/categories"
        );
        setCategories(data);
        const product = await axios.get("https://shopping-mart-react-app.herokuapp.com/api/products/");
        setProduct(product.data);
      } catch (error) {
        console.log("Problem");
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.itemCategory || itemCategory;
    const filterQuery = filter.searching || searching;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.itemPrice || itemPrice;
    const sortOrder = filter.order || order;
    return `/search?page=${filterPage}&query=${filterQuery}&itemCategory=${filterCategory}&itemPrice=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };
  return (
    <>
      <div>
        {/* {loading ? (
         <></>
        ) : error ? (
          <div>{error}</div>
        ) : ( */}
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
                <div className="my-4 p-4">
                  <div className="pt-2">
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
                  </div>
                </div>
                <div className="my-4">
                  <div>
                    <div className="col-lg-12">
                      <Row style={{ width: "100%" }}>
                        <Col
                          lg={2}
                          style={{
                            borderRight: "5px solid #ffffff",
                          }}
                        >
                          <Typography variant="h6">Category</Typography>
                          <div>
                          {loading ? (
                        <>
                          <Stack spacing={1}>
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                          </Stack>
                        </>
                      ) : error ? (
                        <div className="container pt-5">{error}</div>
                      ) : (
                        <>
                            <ul style={{ listStyleType: "none" }}>
                              <li>
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                  }}
                                  className={
                                    "all" === itemCategory ? "text-bold" : ""
                                  }
                                  to={getFilterUrl({ itemCategory: "all" })}
                                >
                                  Any
                                </Link>
                              </li>
                              {categories.map((c) => {
                                return (
                                  <>
                                    <li key={c}>
                                      <Link
                                        style={{
                                          textDecoration: "none",
                                          color: "#000000",
                                        }}
                                        className={
                                          c === itemCategory ? "text-bold" : ""
                                        }
                                        to={getFilterUrl({ itemCategory: c })}
                                      >
                                        {c.toUpperCase()}
                                      </Link>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                            </>)}
                          </div>
                          <Typography variant="h6">Price</Typography>
                          <div>
                          {loading ? (
                        <>
                          <Stack spacing={1}>
                            <Skeleton
                              variant="text"
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                          </Stack>
                        </>
                      ) : error ? (
                        <div className="container pt-5">{error}</div>
                      ) : (
                        <>
                            <ul style={{ listStyleType: "none" }}>
                              <li>
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                  }}
                                  className={
                                    "all" === itemPrice ? "text-bold" : ""
                                  }
                                  to={getFilterUrl({ itemPrice: "all" })}
                                >
                                  Any
                                </Link>
                              </li>
                              {prices.map((p) => {
                                return (
                                  <>
                                    <li key={p.value}>
                                      <Link
                                        style={{
                                          textDecoration: "none",
                                          color: "#000000",
                                        }}
                                        className={
                                          p.value === itemPrice
                                            ? "text-bold"
                                            : ""
                                        }
                                        to={getFilterUrl({
                                          itemPrice: p.value,
                                        })}
                                      >
                                        {p.name}
                                      </Link>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                            </>)}
                          </div>
                          <Typography variant="h6">
                            Avg. Customer Review
                          </Typography>
                          <div>
                          {loading ? (
                        <>
                          <Stack spacing={1}>
                            <Skeleton
                              variant="text"
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                            <Skeleton
                              variant="text"  
                              width="40%"
                            />
                          </Stack>
                        </>
                      ) : error ? (
                        <div className="container pt-5">{error}</div>
                      ) : (
                        <>
                            <ul style={{ listStyleType: "none" }}>
                              {ratings.map((r) => (
                                <li key={r.name}>
                                  <Link
                                    style={{
                                      textDecoration: "none",
                                      color: "#FFBC0B",
                                    }}
                                    to={getFilterUrl({ rating: r.value })}
                                    className={
                                      `${r.value}` === `${rating}`
                                        ? "text-bold"
                                        : ""
                                    }
                                  >
                                    <RatingStart
                                      caption={" & up"}
                                      rating={r.value}
                                    ></RatingStart>
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#FFBC0B",
                                  }}
                                  to={getFilterUrl({ rating: "all" })}
                                  className={
                                    rating === "all" ? "text-bold" : ""
                                  }
                                >
                                  <RatingStart
                                    caption={" & up"}
                                    rating={0}
                                  ></RatingStart>
                                </Link>
                              </li>
                            </ul>
                            </>
                            )}
                          </div>
                        </Col>
                        <Col lg={10} className="p-3" style={{ width: "100%" }}>
                          {loading ? (
                            <div className="container pt-5">
                              <Spinner
                                animation="border"
                                role="status"
                              ></Spinner>
                            </div>
                          ) : error ? (
                            <div>{error}</div>
                          ) : (
                            <>
                              {searching == "" ? (
                                <>
                                  <Row className="justify-content-between mb-3">
                                    <Col md={8}>
                                      <div
                                        className="container ml-5"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        Results "
                                        {countProducts === 0
                                          ? "No"
                                          : countProducts}
                                        " Found
                                        {/* {searching !== "all" && " : " + searching.toUpperCase()} */}
                                        {itemCategory !== "all" &&
                                          " : " + itemCategory.toUpperCase()}
                                        {itemPrice !== "all" &&
                                          " : Price " + itemPrice}
                                        {rating !== "all" &&
                                          " : Rating " + rating + " & up"}
                                        {searching !== "all" ||
                                        itemCategory !== "all" ||
                                        rating !== "all" ||
                                        itemPrice !== "all" ? (
                                          <Button
                                            className="ml-1"
                                            variant="light"
                                            onClick={() => navigate("/search")}
                                          >
                                            <i className="fas fa-times-circle"></i>
                                          </Button>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4} className="text-right">
                                      Sort by{" "}
                                      <select
                                        value={order}
                                        onChange={(e) => {
                                          navigate(
                                            getFilterUrl({
                                              order: e.target.value,
                                            })
                                          );
                                        }}
                                      >
                                        <option value="newest">
                                          Newest Arrivals
                                        </option>
                                        <option value="lowest">
                                          Price: Low to High
                                        </option>
                                        <option value="highest">
                                          Price: High to Low
                                        </option>
                                        <option value="toprated">
                                          Avg. Customer Reviews
                                        </option>
                                      </select>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div
                                        className="row"
                                        style={{ width: "100%" }}
                                      >
                                        {products.map((val, i) => {
                                          return (
                                            <div className="p-3">
                                              <Link
                                                key={i}
                                                to={`/Seller/${val._id}`}
                                              >
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
                                                          height: "230px",
                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        <Rating
                                                          ratingValue={
                                                            val.rating * 20
                                                          }
                                                          size={20}
                                                        ></Rating>
                                                        <Card.Body
                                                          style={{
                                                            textAlign: "center",
                                                            color: "black",
                                                          }}
                                                        >
                                                          <Card.Title
                                                            style={{
                                                              textAlign:
                                                                "center",
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
                                                              textAlign:
                                                                "center",
                                                              color: "black",
                                                            }}
                                                          >
                                                            &#x20B9;{" "}
                                                            {val.itemPrice}
                                                          </Card.Title>
                                                          <Card.Text
                                                            style={{
                                                              textAlign:
                                                                "center",
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
                                          );
                                        })}
                                      </div>
                                    </Col>
                                  </Row>
                                  <div
                                    className="pb-3 pt-5"
                                    style={{ textAlign: "center" }}
                                  >
                                    {[...Array(pages).keys()].map((x) => (
                                      <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={getFilterUrl({ page: x + 1 })}
                                      >
                                        <Button
                                          className={
                                            Number(page) === x + 1
                                              ? "text-bold"
                                              : ""
                                          }
                                          variant="light"
                                        >
                                          {x + 1}
                                        </Button>
                                      </LinkContainer>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="row">
                                    {product
                                      .filter((itm) => {
                                        if (searching == "") {
                                          return itm;
                                        } else if (
                                          itm.itemName
                                            .toLowerCase()
                                            .includes(searching.toLowerCase())
                                        ) {
                                          let final = [{ itm }];
                                          return final;
                                        } else if (
                                          itm.itemCategory
                                            .toLowerCase()
                                            .includes(searching.toLowerCase())
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
                                                  <Link
                                                    key={i}
                                                    to={`/Seller/${val._id}`}
                                                  >
                                                    <Card
                                                      className="card card-item"
                                                      key={i}
                                                      style={{
                                                        overflow: "hidden",
                                                        width: "250px",
                                                        maxWidth: "500px",
                                                        background: "#FFFFFF",
                                                        transitionDuration:
                                                          "1s",
                                                        border:
                                                          "5px solid #BFD3E2",
                                                      }}
                                                    >
                                                      <Container>
                                                        <Row>
                                                          <Col
                                                            style={{
                                                              height: "200px",
                                                              minHeight:
                                                                "170px",
                                                              width: "150px",
                                                              maxHeight:
                                                                "550px",
                                                              marginTop: "1em",
                                                              textAlign:
                                                                "center",
                                                            }}
                                                          >
                                                            <Card.Img
                                                              src={val.image}
                                                              style={{
                                                                maxHeight:
                                                                  "250px",
                                                                height: "auto",
                                                                width: "auto",
                                                                maxWidth:
                                                                  "200px",
                                                                textAlign:
                                                                  "center",
                                                              }}
                                                            />
                                                          </Col>
                                                        </Row>
                                                        <Row className="mt-5">
                                                          <Col
                                                            style={{
                                                              height: "200px",
                                                              textAlign:
                                                                "center",
                                                            }}
                                                          >
                                                            <Card.Body
                                                              style={{
                                                                textAlign:
                                                                  "center",
                                                                color: "black",
                                                              }}
                                                            >
                                                              <Card.Title
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  color:
                                                                    "black",
                                                                }}
                                                              >
                                                                {val.itemName.substring(
                                                                  0,
                                                                  20
                                                                )}
                                                              </Card.Title>
                                                              <Card.Title
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  color:
                                                                    "black",
                                                                }}
                                                              >
                                                                &#x20B9;{" "}
                                                                {val.itemPrice}
                                                              </Card.Title>
                                                              <Card.Text
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  color:
                                                                    "black",
                                                                }}
                                                              >
                                                                {val.itemCategory.toUpperCase()}
                                                              </Card.Text>
                                                              <Button
                                                                className="btn-sm btn-c"
                                                                variant="dark"
                                                              >
                                                                Shop now
                                                                &#x2192;
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
                                </>
                              )}
                            </>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        {/* )} */}
      </div>
    </>
  );
};
export default Search;

{
  /*
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { getError } from "../utils";
import "./Home.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];
const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const itemCategory = sp.get("itemCategory") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "all";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/search?page=${page}&query=${query}&itemCategory=${itemCategory}&price=${price}&rating=${rating}&order=${order}`
        );
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    }
    fetchData();
  }, [itemCategory, error, order, page, price, query, rating]);
  const [pro, setPro] = useState([]);

  const [categories, setCategories] = useState([]);
  
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.itemCategory || itemCategory;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?page=${filterPage}&query=${filterQuery}&itemCategory=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };

  // const { search } = useParams([]);
  useEffect(() => {
    async function getAllStudent() {
      try {
        const student = await axios.get("http://localhost:5000/api/products");
        setPro(student.data.products);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, []);

  if (pro.isLoaded) {
    <p>Loading...</p>;
  }
  const mediaTypes = pro
    .map((dataItem) => dataItem.itemCategory) // get all media types
    .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates

  const counts = mediaTypes.map((mediaType) => ({
    type: mediaType,
    count: pro.filter((item) => item.itemCategory === mediaType).length,
  }));
  return (
    <>
      <div>
        <div
          style={{
            background: "#D8E4E6",
            width: "auto",
            height: "auto",
          }}
        >
          <h3
            className="container d-flex"
            style={{
              lineHeight: "2em",
            }}
          ></h3>
          <Row>
            <Col md={3}></Col>
            <Col>
              {countProducts === 0 ? "No" : countProducts} Results
              {query !== "all" && " : " + query}
              {itemCategory !== "all" && " : " + itemCategory}
              {price !== "all" && " : Price " + price}
              {rating !== "all" && " : rating " + rating + " & up"}
              {query !== "all" ||
              itemCategory !== "all" ||
              rating !== "all" ||
              price !== "all" ? (
                <Button variant="light" onClick={() => navigate("/search")}>
                  <i className="fas fa-times-circle"></i>
                </Button>
              ) : null}
            </Col>
            <Col>
              Sort by
              <select
                value={order}
                onChange={(e) => {
                  navigate(getFilterUrl({ order: e.target.value }));
                }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Avg. Customer Reviews</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ background: "white", height: "350px" }}
              md={2}
              className="pl-5"
            >
              <Typography variant="h6">Department</Typography>
              <div>
                <ul>
                  <li>
                    <Link
                      className={"all" === itemCategory ? "text-bold" : ""}
                      to={getFilterUrl({ itemCategory: "all" })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((c) => {
                    return (
                      <>
                        <li key={c}>
                          <Link
                            className={c.itemCategory === itemCategory ? "text-bold" : ""}
                            to={getFilterUrl({ itemCategory: c.itemCategory })}
                          >
                            {c.itemCategory}
                          </Link>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <Typography variant="h6">Price</Typography>
              <div>
                <ul>
                  <li>
                    <Link
                      className={"all" === price ? "text-bold" : ""}
                      to={getFilterUrl({ price: "all" })}
                    >
                      Any
                    </Link>
                  </li>
                  {prices.map((p) => {
                    return (
                      <>
                        <li key={p.value}>
                          <Link
                            className={p.value === price ? "text-bold" : ""}
                            to={getFilterUrl({ price: p.value })}
                          >
                            {p.name}
                          </Link>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <Typography variant="h6">Avg. Customer Review</Typography>
              <div>
                <ul>
                  <li>
                    <Link
                      className={"all" === price ? "text-bold" : ""}
                      to={getFilterUrl({ price: "all" })}
                    >
                      Any
                    </Link>
                  </li>
                  {prices.map((p) => {
                    return (
                      <>
                        <li key={p.value}>
                          <Link
                            className={p.value === price ? "text-bold" : ""}
                            to={getFilterUrl({ price: p.value })}
                          >
                            {p.name}
                          </Link>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <Typography variant="h6">Rating</Typography>
              {categories.map((val, i) => {
                return (
                  <>
                    <p>{val}</p>
                  </>
                );
              })}
              <br />
            </Col>
            <Col>
              {/* {products.length === 0 && (
              <>
              <div className="row pl-2">
                <p>No Products Found</p>
              </div>
              </>
                )} 
                <div className="row pl-2">
                {products.map((val, i) => {
                  return (
                    <>
                      <div className="col-lg-15 ml-5 my-2 mb-5">
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
                                    height: "230px",
                                    textAlign: "center",
                                  }}
                                >
                                  <Rating
                                    ratingValue={val.rating * 20}
                                    size={20}
                                    ></Rating>
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
                                      {val.itemName.substring(0, 20)}
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
            </Col>
          </Row>
          <div></div>
          </div>
          </div>
          </>
          );
        };
export default Search;
*/
}
