import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { Store } from "../store/Context";
import { Rating } from "react-simple-star-rating";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Loading from "./Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, getProd: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_RATING_REQUEST":
      return { ...state, loading: true };
    case "FETCH_RATING_SUCCESS":
      return { ...state, getRating: action.payload, loading: false };
    case "FETCH_RATING_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function Seller() {
  const [{ loading, error, getProd, getRating }, dispatch] = useReducer(
    reducer,
    {
      getProd: [],
      getRating: [],
      loading: true,
      error: "",
    }
  );
  const { id } = useParams();
  const [search, setSearch] = useState([]);
  const [review, setReview] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          `https://shopping-mart-react-app.herokuapp.com/api/products/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        const all = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/rating/getrating"
        );
        dispatch({ type: "FETCH_RATING_SUCCESS", payload: all.data });

        const user = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/users"
        );
        const userData = user.data.users;
        setUser(userData);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  const [student, setStudents] = useState([]);
  const [all, setAll] = useState([]);
  const [product, setProduct] = useState([]);
  const final = useNavigate();

  useEffect(() => {
    async function getAllStudent() {
      try {
        const student = await axios.get(
          `https://shopping-mart-react-app.herokuapp.com/api/products/${id}`
        );
        setStudents(student.data);
        const product = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/products/"
        );
        setProduct(product.data);
        const all = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/products/"
        );

        setAll(all.data);
        const Product = all.data;
        const newProduct = Product.filter((p) => {
          if (p._id !== student.data._id) {
            return p.itemCategory === student.data.itemCategory;
          }
        });
        setAll(newProduct);
      } catch (error) {
        console.log("Problem");
      }
    }
    getAllStudent();
  }, [id]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [userRating, setUserRating] = useState("");
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setUserRating(event.target.value);
  };

  const ratingAndCommentAdd = async () => {
    if (!userInfo) {
      final("/Login");
    }
    if (
      getRating.find((user) => {
        return user.user === userInfo._id;
      }) &&
      getRating.find((item) => {
        return item.productRating === getProd._id;
      })
    ) {
      toast.error("You are an already give rating on this products");
    } else {
      toast.success("Thank You... For Given Rating & Comments");
      try {
        const res = await axios.post(
          "https://shopping-mart-react-app.herokuapp.com/api/rating/addrating",
          {
            productRating: getProd,
            user: userInfo,
            rating: userRating,
            comment: comment,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        const resUpdate = await axios.put(
          `https://shopping-mart-react-app.herokuapp.com/api/products/update/${id}`,
          {
            itemCategory: student.itemCategory,
            itemName: student.itemName,
            itemPrice: student.itemPrice,
            mnfName: student.mnfName,
            quantity: student.quantity,
            rating: userRating,
            itemUnit: student.itemUnit,
            itemDescription: student.itemDescription,
            image: student.image,
          }
        );
        const data = await res.data;
        return data;
      } catch (err) {
        toast.error(err);
      }
    }
  };

  const send = () => {
    const existItem = cart.cartItems.find((x) => x._id === getProd._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...getProd, quantity } });
  };
  const finalBuy = () => {
    const existItem = cart.cartItems.find((x) => x._id === getProd._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...getProd, quantity } });
    final("/addtocart");
  };
  return (
    <>
      <Helmet>
        <title>Product Summary</title>
      </Helmet>
      {/* {loading ? (
        <Loading/>
      ) : error ? (
        <div>{error}</div>
      ) : ( */}
      <>
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
        <>
          <div className="container col-lg-10 mt-5">
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
                  <div style={{ marginTop: "4em" }} />
                  <div className="my-4 mt-3">
                    <div>
                      <div>
                        {search == "" ? (
                          <>
                            <div
                              className="container d-flex"
                              style={{
                                backgroundColor: "white",
                                paddingTop: "5em",
                              }}
                            >
                              <div className="row">
                                <>
                                  <div
                                    className="d-flex justify-content-center"
                                    style={{ width: "35rem" }}
                                  >
                                    {loading ? (
                                      <Stack spacing={1}>
                                        <Skeleton
                                          variant="rectangular"
                                          width={250}
                                          height={418}
                                          style={{ float: "left" }}
                                        />
                                      </Stack>
                                    ) : error ? (
                                      <div className="container pt-5">
                                        {error}
                                      </div>
                                    ) : (
                                      <Card
                                        className="card"
                                        style={{ border: "none" }}
                                      >
                                        <Card.Img
                                          variant="top"
                                          className="card-item"
                                          style={{
                                            width: "auto",
                                            maxWidth: "200px",
                                            minWidth: "300px",
                                          }}
                                          src={getProd.image}
                                        />
                                      </Card>
                                    )}
                                  </div>

                                  <div
                                    key={getProd._id}
                                    className="col justify-content-center"
                                  >
                                    {loading ? (
                                      <Stack spacing={1}>
                                        <Skeleton variant="text" height={100} />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                      </Stack>
                                    ) : error ? (
                                      <div className="container pt-5">
                                        {error}
                                      </div>
                                    ) : (
                                      <>
                                        <Rating
                                          style={{
                                            textAlign: "left",
                                            color: "black",
                                          }}
                                          ratingValue={getProd.rating * 20}
                                          fillColor="#F68773"
                                          size={15}
                                        />
                                        ({getProd.rating})
                                        <Typography
                                          className="my-3"
                                          variant="h5"
                                        >
                                          <b>{getProd.itemName}</b>
                                        </Typography>
                                        <Typography
                                          className="my-3"
                                          variant="h5"
                                        >
                                          &#x20B9;{getProd.itemPrice}
                                        </Typography>
                                        {getProd.itemQty === 0 ? (
                                          <Button variant="light" disabled>
                                            Out Of Stock
                                          </Button>
                                        ) : (
                                          <>
                                            <p
                                              style={{
                                                color: "green",
                                                fontSize: "20px",
                                              }}
                                            >
                                              <b>In Stock</b>
                                            </p>
                                            <Button
                                              variant="warning"
                                              style={{
                                                backgroundColor: "#F7CA00",
                                                border: "none",
                                                borderRadius: "50px",
                                                maxWidth: "150px",
                                              }}
                                              className="col mb-2 d-flex justify-content-center"
                                              onClick={send}
                                            >
                                              <FaCartArrowDown className="my-1 d-flex justify-content-center" />
                                              &#x2003; Add to Cart
                                            </Button>
                                          </>
                                        )}
                                        <Button
                                          style={{
                                            backgroundColor: "#FA8800",
                                            border: "none",
                                            borderRadius: "50px",
                                            maxWidth: "150px",
                                          }}
                                          className="col d-flex justify-content-center mb-3"
                                          onClick={finalBuy}
                                        >
                                          <FaCartPlus className="my-1 d-flex justify-content-center" />
                                          &#x2003;&#x2003; Buy Now
                                        </Button>
                                        <Divider className="my-4" variant="middle" />
                                        <Typography
                                          className="mt-3"
                                          style={{fontSize:"15px"}}

                                        >
                                          <small><b>CATEGORY:</b></small>
                                          &#x2003;
                                          <small><span style={{color:"#999999"}}>{getProd.itemCategory.toUpperCase()}</span></small>
                                        </Typography>
                                        {getProd.mnfName ? (
                                           <Typography
                                           className="my-1"
                                           style={{fontSize:"15px"}}
                                         >
                                           <small><b>
                                            MANUFACTURE BY:</b></small>
                                            &#x2003;
                                            <small><span style={{color:"#999999"}}>{getProd.mnfName.toUpperCase()}</span></small>
                                          </Typography>
                                        ) : (
                                          <>
                                          <ShoppingBag
                                            style={{
                                              fontSize: "25px",
                                              textAlign: "left",
                                              color:"black"
                                            }}
                                            />
                                          <Typography
                                          className="my-1"
                                          style={{fontSize:"15px"}}
                                        >
                                          <small><b>
                                           MANUFACTURE BY:</b></small>
                                           &#x2003;
                                              
                                              <small><span style={{color:"#999999"}}>MART Product</span></small>
                                          </Typography>
                                          </>
                                        )}
                                        <Typography
                                          className="my-1"
                                          style={{fontSize:"15px"}}
                                        >
                                          <small><b>DESCRIPTION:</b></small>
                                          &#x2003;
                                          <small><span style={{color:"#999999"}}>{getProd.itemDescription}</span></small>
                                        </Typography>
                                      </>
                                    )}
                                    <Divider className="my-4" variant="middle" />
                                    <div className="my-4">
                                      <Row>
                                        <Col>
                                          <Typography variant="h5">
                                            Customer Review
                                          </Typography>
                                        </Col>
                                      </Row>
                                      <div className="my-3">
                                        <Row>
                                          <Col>
                                            <Typography variant="h6">
                                              Rating
                                            </Typography>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <FormControl
                                              variant="standard"
                                              sx={{
                                                minWidth: 520,
                                                maxWidth: 500,
                                              }}
                                            >
                                              <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={userRating}
                                                onChange={handleChange}
                                                label="Age"
                                              >
                                                <MenuItem selected value="1">
                                                  1
                                                </MenuItem>
                                                <MenuItem selected value="2">
                                                  2
                                                </MenuItem>
                                                <MenuItem selected value="3">
                                                  3
                                                </MenuItem>
                                                <MenuItem selected value="4">
                                                  4
                                                </MenuItem>
                                                <MenuItem selected value="5">
                                                  5
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Col>
                                        </Row>
                                      </div>
                                      <Row>
                                        <Col>
                                          <Typography variant="h6">
                                            Comment
                                          </Typography>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <textarea
                                            aria-label="empty textarea"
                                            placeholder="Write a Comment"
                                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            onChange={(e) =>
                                              setComment(e.target.value)
                                            }
                                          />
                                        </Col>
                                      </Row>
                                      <div className="mt-2">
                                        <Row>
                                          <Col>
                                            <Button
                                              style={{
                                                backgroundColor: "#000000",
                                                border: "none",
                                              }}
                                              className="col d-flex justify-content-center"
                                              onClick={ratingAndCommentAdd}
                                            >
                                              SUBMIT
                                            </Button>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </div>
                            </div>
                            <div className="col-lg-15 p-5">
                              <Typography variant="h4">
                                Customer Review
                              </Typography>
                              <>
                                {loading ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box sx={{ margin: 1 }}>
                                        <Skeleton variant="circular">
                                          <Avatar />
                                        </Skeleton>
                                      </Box>
                                      <Box sx={{ width: "100%" }}>
                                        <Skeleton width="10%">
                                          <Typography>.</Typography>
                                        </Skeleton>
                                      </Box>
                                    </Box>
                                    <Box sx={{ width: "100%", ml: 7 }}>
                                      <Skeleton width="10%">
                                        <Typography>.</Typography>
                                      </Skeleton>
                                    </Box>
                                    <Box sx={{ width: "100%", ml: 7 }}>
                                      <Skeleton width="10%">
                                        <Typography>.</Typography>
                                      </Skeleton>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    {getRating
                                    .filter((item) => {
                                      if (item.productRating === getProd._id) {
                                        return item;
                                      }
                                    })
                                    .map((val, i) => {
                                      return (
                                        <>
                                          {val ? (
                                            <>
                                              <div key={i} className="p-4">
                                                  <>
                                                {user
                                                  .filter((t) => {
                                                    if (t._id === val.user) {
                                                      return t;
                                                    }
                                                  })
                                                  .map((g, i) => {
                                                    return (
                                                      <>
                                                      <Avatar
                                                        key={i}
                                                        className="mr-2"
                                                        sx={{
                                                          background: "black",
                                                          float: "left",
                                                        }}
                                                        alt={g.firstname}
                                                        src="/static/images/avatar/2.jpg"
                                                      />
                                                      </>
                                                    )})}
                                                    </>                                               
                                                  
                                                <Typography
                                                  className="p-1"
                                                  variant="h6"
                                                >
                                                  {user
                                                    .filter((t) => {
                                                      if (t._id === val.user) {
                                                        return t;
                                                      }
                                                    })
                                                    .map((g) => {
                                                      return (
                                                        g.firstname +
                                                        " " +
                                                        g.lastname
                                                      );
                                                    })}
                                                </Typography>
                                                <Rating
                                                style={{marginLeft:"3em"}}
                                                  ratingValue={val.rating * 20}
                                                  size="20"
                                                />
                                                <Typography style={{marginLeft:"3em"}} className="p-1">
                                                  {val.comment}
                                                </Typography>
                                              </div>
                                              <Divider variant="middle" />
                                            </>
                                          ) : (
                                            "No Coustomer Review Yet"
                                          )}
                                        </>
                                      );
                                    })}
                                  </>
                                )}
                              </>
                            </div>

                            <div
                              className="col-lg-15 mt-5"
                              style={{ zIndex: 1 }}
                            >
                              <Typography
                                variant="h5"
                                className="pt-5 pb-5 pl-5 text-center"
                              >
                                <small>
                                  <b>RELATED PRODUCT</b>
                                </small>
                              </Typography>
                              <div className="row pl-5">
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
                                    {all.length !== 0 ? (
                                      <>
                                        {all.map((val, i) => {
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
                                                            height: "150px",
                                                            minHeight: "170px",
                                                            width: "150px",
                                                            maxHeight: "550px",
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
                                                                textAlign:
                                                                  "left",
                                                                color: "black",
                                                              }}
                                                            >
                                                              <Typography
                                                                style={{
                                                                  fontSize:
                                                                    "15px",
                                                                }}
                                                              >
                                                                {val.itemName
                                                                  .toUpperCase()
                                                                  .substring(
                                                                    0,
                                                                    20
                                                                  )}
                                                              </Typography>
                                                              <Rating
                                                                style={{
                                                                  textAlign:
                                                                    "left",
                                                                  color:
                                                                    "black",
                                                                }}
                                                                ratingValue={
                                                                  val.rating *
                                                                  20
                                                                }
                                                                fillColor="#F68773"
                                                                size={15}
                                                              />
                                                            </Card.Title>
                                                            <Card.Title
                                                              style={{
                                                                textAlign:
                                                                  "left",
                                                                color: "black",
                                                              }}
                                                            >
                                                              <Typography
                                                                style={{
                                                                  fontSize:
                                                                    "15px",
                                                                }}
                                                              >
                                                                &#x20B9;{" "}
                                                                {val.itemPrice}
                                                              </Typography>
                                                            </Card.Title>
                                                            <Card.Text
                                                              style={{
                                                                textAlign:
                                                                  "left",
                                                                color: "tomato",
                                                              }}
                                                            >
                                                              <small>
                                                                ADD TO CART
                                                              </small>{" "}
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
                                          );
                                        })}
                                      </>
                                    ) : (
                                      <div className="container">
                                        <Typography variant="h5">
                                          No Any Found Related Product
                                        </Typography>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: "2rem",
                                marginBottom: "2rem",
                              }}
                            ></div>
                            <div className="my-5" style={{ zIndex: 0 }}>
                              <Typography
                                variant="h5"
                                className="pt-5 pb-5 pl-5 text-center"
                              >
                                <small>
                                  <b>ALSO MAY YOU LIKE</b>
                                </small>
                              </Typography>
                              <div className="row pl-5 pb-5">
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
                                    {product.map((val, i) => {
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
                                                        height: "150px",
                                                        minHeight: "170px",
                                                        width: "150px",
                                                        maxHeight: "550px",
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
                                                            &#x20B9;{" "}
                                                            {val.itemPrice}
                                                          </Typography>
                                                        </Card.Title>
                                                        <Card.Text
                                                          style={{
                                                            textAlign: "left",
                                                            color: "tomato",
                                                          }}
                                                        >
                                                          <small>
                                                            ADD TO CART
                                                          </small>{" "}
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
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="row pt-5">
                            {product
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
                                              width: "250px",
                                              maxWidth: "500px",
                                              transitionDuration: "1s",
                                              border: "none",
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
                                                  <Link
                                                    key={i}
                                                    to={`/Seller/${val._id}`}
                                                  >
                                                    <Card.Body
                                                      style={{
                                                        textAlign: "center",
                                                        color: "black",
                                                      }}
                                                    >
                                                      <Card.Title
                                                        style={{
                                                          textAlign: "left",
                                                          color: "black",
                                                        }}
                                                      >
                                                        {val.itemName
                                                          .toUpperCase()
                                                          .substring(0, 20)}
                                                      </Card.Title>
                                                      <Card.Title
                                                        style={{
                                                          textAlign: "left",
                                                          color: "black",
                                                        }}
                                                      >
                                                        &#x20B9; {val.itemPrice}
                                                      </Card.Title>
                                                      <Card.Text
                                                        style={{
                                                          textAlign: "left",
                                                          color: "tomato",
                                                        }}
                                                      >
                                                        <small>
                                                          ADD TO CART
                                                        </small>{" "}
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
            </>
          </div>
        </>
      </>
      {/* )} */}
    </>
  );
}

export default Seller;

// const [allRate, setAllRate] = useState([]);
// const aRate = await axios.get(
//   "https://fakestoreapi.com/products/"
// );
// setAllRate(aRate.data.rating);

// const rat = aRate.data;
// const newRat = rat.filter((p) => {
//   return (
//     p.rating == rate.data.rating
//   );
// });
// setAllRate(newRat);
