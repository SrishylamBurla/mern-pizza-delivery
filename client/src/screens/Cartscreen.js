import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from "../actions/cartActions"
import Checkout from "../components/Checkout"

export default function Cartscreen() {

    const dispatch = useDispatch()

    const cartstate = useSelector(state => state.cartReducer)
    const cartItems = cartstate.cartItems
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0)

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-6 m-2">
                    <h2 style={{ fontSize: "30px", marginBottom: '20px' }}>My Cart</h2>


                    {cartItems.map(item => {
                        return <div className="flex-container m-2">
                            <div className="w-100 m-1" style={{ textAlign: 'left' }}>
                                <h1>{item.name}[{item.varient}]</h1>
                                <h1>Price : {item.quantity} * {item.prices[0][item.varient]} = {item.price}</h1>
                                <div>
                                    <h1 style={{ display: 'inline' }}> Quantity : </h1>
                                    <i className="fa-solid fa-plus" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }}></i>
                                    <b className="item-quantity"> {item.quantity} </b>
                                    <i className="fa-solid fa-minus" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }}></i>
                                </div>
                                <hr />
                            </div>
                            <div className="w-50 m-1">
                                <img src={item.image} style={{ height: '80px', width: '80px' }} alt="cart-item" />
                            </div>

                            <div className="w-50 m-1">
                                <i className="fa-solid fa-trash mt-5" onClick={() => { dispatch(deleteFromCart(item)) }}></i>
                            </div>



                        </div>
                    })}

                </div>

                <div className="col-md-4 m-2" style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '30px' }}>SubTotal : {subtotal} Rs/- </h2>

                    <Checkout subtotal={subtotal} />
                </div>
            </div>
        </div>)
}
