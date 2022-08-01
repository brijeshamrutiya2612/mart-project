import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Store } from '../store/Context'
import CheckOutSteps from './CheckOutSteps'
import {Helmet} from "react-helmet"

const Payment = () => {
  const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart:{
            shippingAddress, paymentMethod
        },
    } = state;
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    )
    useEffect(()=>{
        if(!shippingAddress.address1){
            navigate('/shipping')
        }
    },[shippingAddress, navigate])
    const submitHandler = (e) =>{
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName})
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/Finalpayment')
    } 
  return (
    <div>
       <Helmet>
          <title>Payment Mode</title>
        </Helmet>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div 
        style={{
          background: "#D3DDE5",
          width: "auto",
          height: "auto",
        }}
      >
        <div className='container col-lg-15 pt-3 pb-3 justify-content-center'>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Check
            className="col-md-8 my-3 justify-content-center"
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            >   
            </Form.Check>
            <Form.Check
            className="col-md-8 my-3 justify-content-center"
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            >
            </Form.Check>
            <div className="text-left my-1">
          <Button style={{background:"#6897bb",border:"1px solid #6897bb"}} type="submit" size="sm">
            Continue
          </Button>
        </div>
        </Form>
        </div>
      </div>
    </div>
  )
}

export default Payment
