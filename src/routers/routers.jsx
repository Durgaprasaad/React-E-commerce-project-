import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from './ProtectedRoute'
import useAuth from '../custom-hooks/useAuth'
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import ProductDetails from "../pages/ProductDetails"
import Cart from '../pages/Cart'
import CheckOut from "../pages/CheckOut"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"

const DefaultRoute = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
};

export const Routers = () => {
    return (
        <Routes>
            <Route element={<DefaultRoute />} />
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
           
                <Route path='/checkout' element={
                 <ProtectedRoute>
                <CheckOut />
                </ProtectedRoute>
                } />
            
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    )
}
