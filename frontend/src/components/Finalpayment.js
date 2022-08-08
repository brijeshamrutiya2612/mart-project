import React, { useContext, useEffect, useReducer } from "react";
import { Button, Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store/Context";
import CheckOutSteps from "./CheckOutSteps";
import { toast } from "react-toastify";
import Axios from "axios";
import { Helmet } from "react-helmet";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Finalpayment() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
    userInfo,
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cartItems.itemPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.itemPrice, 0)
  );
  cartItems.shippingPrice = cartItems.itemPrice > 500 ? round2(0) : round2(10);
  cartItems.taxPrice = round2(0.15 * cartItems.itemPrice);
  cartItems.totalPrice =
    cartItems.itemPrice + cartItems.shippingPrice + cartItems.taxPrice;

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  const handleSubmit = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "https://shopping-mart-react-app.herokuapp.com/api/orders",
        {
          orderItems: cartItems,
          mnfName:cartItems.mnfName,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemPrice: cartItems.itemPrice,
          shippingPrice: cartItems.shippingPrice,
          taxPrice: cartItems.taxPrice,
          totalPrice: cartItems.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(err);
    }
  };

  return (
    <div>
      <Helmet>
          <title>Final Payment</title>
        </Helmet>
      <div
        style={{
          width: "auto",
          height: "auto",
        }}
      >
         <div className='container col-lg-8 pt-3 pb-3 justify-content-center'>
        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
          <h2 className="pt-3">Order Summary</h2>
          <Row>
            <Col>
              <Card style={{color:"#000000"}} className="mb-3">
                <Card.Body>
                  <Card.Title>Shipping Address</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {shippingAddress.firstname}{" "}
                    {shippingAddress.lastname}
                    <br />
                    <strong>Address:</strong> {shippingAddress.address1}{" "}
                    {shippingAddress.address2} {shippingAddress.address3}
                  </Card.Text>
                  <Link to="/shipping">Edit</Link>
                </Card.Body>
              </Card>
              <Card style={{color:"#000000"}} className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method:</strong> {paymentMethod}
                  </Card.Text>
                  <Link to="/Payment">Edit</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              Your Cart Items {cartItems.length} and Qty{" "}
              {cartItems.reduce((a, c) => a + c.quantity, 0)}
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
                  {cartItems.map((item, i) => {
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
            <Col>
              <Card style={{color:"#000000"}} className="mb-3">
                <Card.Body>
                  <Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col sm={7}>
                            Subtotal (
                            {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                            items) :
                          </Col>
                          <Col className="text-right">
                            {" "}
                            &#x20B9;{" "}
                            {cartItems.reduce(
                              (a, c) => a + c.itemPrice * c.quantity,
                              0
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Tax:</Col>
                          <Col className="text-right">
                            &#x20B9; {Math.floor(cartItems.taxPrice)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <>
                        <ListGroup.Item>
                          <Row>
                            <Col sm={9}>Shipping Charge:</Col>
                            <Col className="text-right">
                              &#x20B9; {cartItems.shippingPrice}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Grand Total:</Col>
                            <Col className="text-right">
                              &#x20B9; {Math.floor(cartItems.totalPrice)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </>
                      <div className="text-right">
                        <div className="demo-content bg-alt">
                          <div className="text-center my-4">
                            <Button
                              style={{background:"#6897bb",border:"1px solid #6897bb"}}
                              size="md"
                              type="button"
                              onClick={handleSubmit}
                            >
                              Total Amount{" "}
                              <b>&#x20B9;{Math.floor(cartItems.totalPrice)}</b>{" "}
                              to Pay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Finalpayment;
