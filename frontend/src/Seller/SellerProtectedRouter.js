import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Store } from '../store/Context'

const SellerProtectedRouter = ({children}) => {
    const {state} = useContext(Store)
    const {sellerInfo} = state;

    return sellerInfo ? children : <Navigate to="/login" />;
}

export default SellerProtectedRouter
