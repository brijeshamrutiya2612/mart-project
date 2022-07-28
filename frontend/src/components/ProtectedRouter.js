import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Store } from '../store/Context'

const ProtectedRouter = ({children}) => {
    const {state} = useContext(Store)
    const {userInfo} = state;

    return userInfo ? children : <Navigate to="/login" />;
}

export default ProtectedRouter
