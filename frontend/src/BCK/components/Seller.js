import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { getData } from "../store/ProductsSlice";
import { Store } from "../store/Context";
import { Rating } from "react-simple-star-rating";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import {
  AppBar,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

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
          `http://localhost:5000/api/products/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        const all = await axios.get(
          "http://localhost:5000/api/rating/getrating"
        );
        dispatch({ type: "FETCH_RATING_SUCCESS", payload: all.data });

        const user = await axios.get("http://localhost:5000/api/users");
        const userData = user.data.users;
        setUser(userData);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id, dispatch]);

  const [student, setStudents] = useState([]);
  const [all, setAll] = useState([]);
  const [product, setProduct] = useState([]);
  const final = useNavigate();

  useEffect(() => {
    dispatch(getData());
    async function getAllStudent() {
      try {
        const student = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setStudents(student.data);
        const product = await axios.get("http://localhost:5000/api/products/");
        setProduct(product.data);
        const all = await axios.get("http://localhost:5000/api/products/");

        setAll(all.data);
        const Product = all.data;
        const newProduct = Product.filter((p) => {
          return p.itemCategory === student.data.itemCategory;
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
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/rating/addrating",
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
        const data = await res.data;
        return data;
      } catch (err) {
        toast.error(err);
      }

      try {
        const addProductRateing = await axios.put(
          `http://localhost:5000/api/products/update/${id}`,
          {
            rating: (userRating += 1),
          }
        );
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
      {loading ? (
        <div className="container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
            <div>
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
                      <div style={{ marginTop: "0em" }} />
                      <div className="my-4 mt-1">
                        <div>
                          <div className="container col-lg-12 mt-5">
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
                                    <div
                                      className="d-flex justify-content-center"
                                      style={{ width: "35rem" }}
                                    >
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
                                    </div>

                                    <div
                                      key={getProd._id}
                                      className="col pt-5 justify-content-center"
                                    >
                                      <h2>
                                        <u>{getProd.itemName}</u>
                                      </h2>
                                      <Rating
                                        ratingValue={getProd.rating * 20}
                                        size={20}
                                      />
                                      ({getProd.rating})
                                      <h5>
                                        Price: &#x20B9;{getProd.itemPrice}
                                      </h5>
                                      <h5>
                                        Category:{" "}
                                        {getProd.itemCategory.toUpperCase()}
                                      </h5>
                                      {getProd.mnfName ? (
                                        <h5>
                                          Manufacture By:{" "}
                                          {getProd.mnfName.toUpperCase()}
                                        </h5>
                                      ) : (
                                        <h5>
                                          Manufacture By:{" "}
                                          <ShoppingBag
                                            style={{
                                              fontSize: "25px",
                                              textAlign: "center",
                                            }}
                                          />{" "}
                                          MART Product
                                        </h5>
                                      )}
                                      <p>
                                        <b>Description:</b>{" "}
                                        {getProd.itemDescription}
                                      </p>
                                      {getProd.itemQty === 0 ? (
                                        <Button variant="light" disabled>
                                          Out Of Stock
                                        </Button>
                                      ) : (
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
                                      )}
                                      <Button
                                        style={{
                                          backgroundColor: "#FA8800",
                                          border: "none",
                                          borderRadius: "50px",
                                          maxWidth: "150px",
                                        }}
                                        className="col d-flex justify-content-center"
                                        onClick={finalBuy}
                                      >
                                        <FaCartPlus className="my-1 d-flex justify-content-center" />
                                        &#x2003;&#x2003; Buy Now
                                      </Button>
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
                                  </div>
                                </div>
                                <div className="col-lg-15 p-5">
                                  <Typography variant="h4">
                                    Customer Review
                                  </Typography>
                                  <>
                                    {getRating
                                      .filter((item) => {
                                        if (
                                          item.productRating === getProd._id
                                        ) {
                                          return item;
                                        }
                                      })
                                      .map((val, i) => {
                                        return (
                                          <>
                                            {
                                              val ? (
                                                <>
                                                  <div key={i} className="p-4">
                                                    {user
                                                      .filter((t) => {
                                                        if (
                                                          t._id === val.user
                                                        ) {
                                                          return t;
                                                        }
                                                      })
                                                      .map((g, i) => {
                                                        return (
                                                          <Avatar
                                                            key={i}
                                                            className="mr-2"
                                                            sx={{
                                                              background:
                                                                "black",
                                                              float: "left",
                                                            }}
                                                            alt={g.firstname}
                                                            src="/static/images/avatar/2.jpg"
                                                          />
                                                        );
                                                      })}
                                                    <Typography
                                                      className="p-1"
                                                      variant="h6"
                                                    >
                                                      {user
                                                        .filter((t) => {
                                                          if (
                                                            t._id === val.user
                                                          ) {
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
                                                      ratingValue={
                                                        val.rating * 20
                                                      }
                                                      size="20"
                                                    />
                                                    <Typography className="p-1">
                                                      {val.comment}
                                                    </Typography>
                                                  </div>
                                                </>
                                              ) : (
                                                "No Coustomer Review Yet"
                                              )
                                            }
                                          </>
                                        );
                                      })}
                                  </>
                                </div>

                                <div
                                  className="col-lg-15 mt-5"
                                  style={{ zIndex: 1 }}
                                >
                                  <h3 className="d-flex pt-5 pb-5 pl-5">
                                    Related Products
                                  </h3>
                                  <div className="row pl-5">
                                    {!all
                                      ? "No Related Data"
                                      : all.map((val, i) => {
                                          return (
                                            <>
                                              <div
                                                key={i}
                                                className="col-lg-15 ml-5 my-3 d-flex justify-content-center"
                                              >
                                                <Link to={`/Seller/${val._id}`}>
                                                  <Card
                                                    className="card card-item"
                                                    style={{
                                                      overflow: "hidden",
                                                      width: "250px",
                                                      maxWidth: "500px",
                                                      background: "#FFFFFF",
                                                      transitionDuration: "1s",
                                                      border:
                                                        "5px solid #BFD3E2",
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
                                                              maxHeight:
                                                                "250px",
                                                              height: "auto",
                                                              width: "auto",
                                                              maxWidth: "200px",
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
                                                            textAlign: "center",
                                                          }}
                                                        >
                                                          <Card.Body
                                                            style={{
                                                              textAlign:
                                                                "center",
                                                              color: "black",
                                                            }}
                                                          >
                                                            <Rating
                                                              ratingValue={
                                                                val.rating * 20
                                                              }
                                                              size={15}
                                                            ></Rating>
                                                            <Card.Title
                                                              style={{
                                                                textAlign:
                                                                  "center",
                                                                color: "black",
                                                                fontSize:
                                                                  "20px",
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
                                </div>
                                <div
                                  style={{
                                    marginTop: "2rem",
                                    marginBottom: "2rem",
                                  }}
                                ></div>
                                <div className="my-5" style={{ zIndex: 0 }}>
                                  <h3 className="d-flex pt-5 pb-5 pl-5">
                                    Also may you like
                                  </h3>
                                  <div className="row pl-5 pb-5">
                                    {product.map((val, i) => {
                                      return (
                                        <>
                                          <div
                                            key={i}
                                            className="col-lg-15 ml-5 my-3 d-flex justify-content-center"
                                          >
                                            <Link to={`/Seller/${val._id}`}>
                                              <Card
                                                className="card card-item"
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
                                                        <Rating
                                                          ratingValue={
                                                            val.rating * 20
                                                          }
                                                          size={15}
                                                        ></Rating>
                                                        <Card.Title
                                                          style={{
                                                            textAlign: "center",
                                                            color: "black",
                                                            fontSize: "20px",
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
                                                          &#x20B9;{" "}
                                                          {val.itemPrice}
                                                        </Card.Title>

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
                                </div>
                              </>
                            ) : (
                              <div className="row">
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
                                    console.log(val);
                                    return (
                                      <>
                                        {val ? (
                                          <>
                                            <div
                                              key={i}
                                              className="col-lg-15 ml-5 my-3 d-flex justify-content-center"
                                            >
                                              <Link to={`/Seller/${val._id}`}>
                                                <Card
                                                  className="card card-item"
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
        </>
      )}
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
