import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Loading from '../components/Loading'
import Error from '../components/Error'
export default function Ordersscreen() {

    const dispatch = useDispatch()
    const orderstate = useSelector((state) => state.getUserOrdersReducer)
    const { orders, error, loading } = orderstate

    useEffect(() => {
        dispatch(getUserOrders())
    }, [])


    return (
        <div>
            <h2 style={{ fontSize: '35px' }}>My Orders</h2>
            <hr />
            <div className="row justify-content-center">
                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {orders && orders.map(order => {
                    return <div className="col-md-8 m-2" style={{backgroundColor:'red' , color:'white'}}>
                        <div className="flex-container mt-3 p-2">
                            <div className="w-100 m-2" style={{textAlign:'left'}}>
                                <h2 style={{fontSize:"25px"}}>Items</h2>
                                <hr />
                                {order.orderItems.map(item=>{
                                    return <div>
                                        <h1>{item.name}[{item.varient}]*{item.quantity}={item.price}</h1>
                                    </div>
                                })}
                            </div>
                            <div className="w-100 m-2" style={{textAlign:'left'}}>
                            <h2 style={{fontSize:"25px"}}>Address</h2>
                            <hr />
                            <h1>Street : {order.shippingAddress.street} </h1>
                            <h1>City : {order.shippingAddress.city}</h1>
                            <h1>Country : {order.shippingAddress.country}</h1>
                            <h1>Pincode : {order.shippingAddress.pincode}</h1>
                            </div>
                            <div className="w-100 m-2" style={{textAlign:'left'}}>
                            <h2 style={{fontSize:"25px"}}>Order Info</h2>
                            <hr />
                            <h1>Order Amount : {order.orderAmount}</h1>
                            <h1>Date : {order.createdAt.substring(0,10)}</h1>
                            <h1>Transaction Id : {order.transactionId}</h1>
                            <h1>Order Id : {order._id}</h1>

                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}