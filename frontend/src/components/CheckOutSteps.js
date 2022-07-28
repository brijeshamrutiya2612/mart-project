import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './Home.css'

const CheckOutSteps = (props) => {
  return (
    <div className='container my-3 pb-5'>
        <Row className='checkout-steps'>
            <Col className={props.step1 ? 'active' : ''}>Cart</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment</Col>
            <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
        </Row>
    </div>
  )
}

export default CheckOutSteps
