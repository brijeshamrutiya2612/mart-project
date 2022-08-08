import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Button, Card, Col, ListGroup, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../store/Context";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import {Helmet} from "react-helmet"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    // PAYPAL

    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    default:
      return state;
  }
}

const OrderScreen = () => {
  const { state } = useContext(Store);
  const {
    // eslint-disable-next-line
    cart,
    userInfo,
  } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, action) {
    return action.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice.toFixed(2) },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  function onApprove(data, action) {
    return action.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `https://shopping-mart-react-app.herokuapp.com/api/orders/${order._id}/pay`,
          details,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`
            },
          }
        );
        dispatch({ type: "PAY_SUCESS", payload: data });
        toast.success("Order is Paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: err });
        toast.error(err);
      }
    });
  }

  function onError(error) {
    toast.error(error);
  }
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://shopping-mart-react-app.herokuapp.com/api/orders/${orderId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: clientId } = await axios.get(
          "https://shopping-mart-react-app.herokuapp.com/api/keys/paypal",
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPayPalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);
  const home = () => {
    navigate("/");
  };
  
  return loading ? (
    <div className="container pt-5">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  ) : error ? (
    "Something Went Wrong"
  ) : (
    <>
      <div>
        <Helmet>
          <title>Order Summary</title>
        </Helmet>
        <div
        style={{
          width: "auto",
          height: "auto",
        }}
      >
         <div className='container col-lg-8 pt-3 pb-3 justify-content-center'>
        <h1 className="my-3">Order {orderId}</h1>
        <Row>
          <Col md={8}>
            <Card style={{color:"#000000"}} className="mb-3">
              <Card.Body>
                <Card.Title>Shipping Address</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {order.shippingAddress.firstname}
                  {order.shippingAddress.lastname}
                  <br />
                  <strong>Address:</strong> {order.shippingAddress.address1}{" "}
                  {order.shippingAddress.address2}{" "}
                  {order.shippingAddress.address3}
                </Card.Text>
                {order.isDelivered ? (
                  <Box style={{textAlign:"center", backgroundColor:"#5ac95a",padding:"10px",border:"1px solid",borderRadius:"65px"}}><strong>Delivered at {order.deliveredAt}</strong></Box>
                ) : (
                  <Box  style={{textAlign:"center", backgroundColor:"#d65e68",padding:"10px",border:"1px solid",borderRadius:"65px"}}><strong>Not Delivered</strong></Box>
                )}
              </Card.Body>
            </Card>
            <Card style={{color:"#000000"}} className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {order.paymentMethod}
                </Card.Text>
                {order.isPaid ? (
                  <Box style={{textAlign:"center", backgroundColor:"#5ac95a",padding:"10px",border:"1px solid",borderRadius:"65px"}}><strong>Paid at {order.paidAt}</strong></Box>
                ) : (
                  <Box style={{backgroundColor:"#d65e68",padding:"10px",border:"1px solid",borderRadius:"65px"}}><strong>Not Paid</strong></Box>
                )}
              </Card.Body>
            </Card>{" "}
            Your Cart Items {order.orderItems.length} and Qty{" "}
            {order.orderItems.reduce((a, c) => a + c.quantity, 0)}
            <Table striped className="my-4" style={{background:"white"}}>
              <thead>
                <tr>
                  <th>Items</th>
                  <th colSpan={2}>Description</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Qty</th>
                  <th style={{ textAlign: "right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          style={{ width: "4rem" }}
                          src={item.image}
                          alt=""
                        />
                      </td>
                      <td>
                        <strong>{item.itemName}</strong>
                        <br />
                        {item.itemDescription}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        &#x20B9; {item.itemPrice}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span className="mx-2">{item.quantity}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                      &#x20B9; {item.itemPrice * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <Card style={{color:"#000000"}}>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>&#x20B9;{order.itemPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>&#x20B9;{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>&#x20B9;{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Order Total</Col>
                      <Col>&#x20B9;{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {isPending ? (
                        <div className="container pt-5">
                          <Spinner animation="border" role="status"></Spinner>
                        </div>
                      ) : (
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      )}
                      {loadingPay ? (
                        <div className="container pt-5">
                          <Spinner animation="border" role="status"></Spinner>
                        </div>
                      ):<div className="container pt-5">
                      <Spinner animation="border" role="status"></Spinner>
                    </div>}
                    </ListGroup.Item>
                  )}
                    <div className="pt-3">
                              <Button
                                variant="light"
                                className="btn"
                                onClick={home}
                              >
                                <strong>&#x2190;Continue Shopping</strong>
                              </Button>
                            </div>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
