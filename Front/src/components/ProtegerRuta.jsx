import React from 'react'
import { Navigate } from "react-router-dom";


const ProtegerRuta = ({ children }) => {

    const token = localStorage.getItem("token");
    
    return token ? children : <Navigate to="/" replace />;
}

export default ProtegerRuta
