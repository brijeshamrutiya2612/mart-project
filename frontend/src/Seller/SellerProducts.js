import React, { useContext, useEffect, useReducer, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SellerSideBar from "./SellerSideBar";
import { Store } from "../store/Context";
import { Link } from "react-router-dom";

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

function SellerProducts() {
  const [{ loading, error, getProd }, dispatch] = useReducer(reducer, {
    getProd: [],
    loading: true,
    error: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sellerInfo } = state;

  const navigate = useNavigate();
  const [category, setCategory] = useState("");

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

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const productEdit = (id) => {
    navigate(`/SellerEditProducts/${id}`);
  };
  const productDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://shopping-mart-react-app.herokuapp.com/api/products/${id}`,
        {
          headers: {
            authorization: `Bearer ${sellerInfo.token}`,
          },
        }
      );
      navigate("/SellerProducts");
    } catch (err) {
      toast.error(err);
    }
  };
  const addProduct = () => {
    navigate("/SellerAddProduct");
  };
  return (
    <>
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
              {loading ? (
                <div className="container pt-5">
                  <Spinner animation="border" role="status"></Spinner>
                </div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <div className="row">
                  <div
                    className="mr-4 pt-3"
                    style={{
                      textAlign: "right",
                      width: "100%",
                    }}
                  >
                    <AddBoxOutlinedIcon onClick={addProduct} />
                  </div>
                  {getProd
                    .filter((itm) => {
                      if (itm.mnfName === sellerInfo.mnfName) {
                        return itm;
                      }
                    })
                    .map((val, i) => {
                      return (
                        <>
                          <div className="col-lg-15 ml-5 my-5">
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
                                      height: "auto",
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
                                    </Card.Body>
                                  </Col>
                                </Row>
                              </Container>

                              <div
                                className="text-center p-2"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <Button
                                  variant="secondary"
                                  onClick={() => productEdit(val._id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className="ml-5"
                                  variant="danger"
                                  onClick={() => productDelete(val._id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Card>
                          </div>
                        </>
                      );
                    })}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SellerProducts;
