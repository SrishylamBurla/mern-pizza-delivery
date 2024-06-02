import React from "react";
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch , useSelector} from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
export default function Checkout({subtotal}){

    const orderstate = useSelector(state=>state.placeOrderReducer)
    const {loading , error , success} = orderstate
    const dispatch = useDispatch()
    function tokenHandler(token){
        console.log(token)
        dispatch(placeOrder(token, subtotal))
    }
    return(

        <div>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='Your Order Placed Successfully' />)}
            <StripeCheckout
                amount={subtotal*100}
                shippingAddress
                token={tokenHandler}
                stripeKey="pk_test_51PKteVSIECe6Bgv6Mc2WsK51wnRehQ8ZwYNPzlH3GkcYd1rPJzNN2odT9T6Z6n4wHrOSvZJnoOJGrmcvBrqWVuJm008e39wDaB"
                currency="INR"
            >

                <button className="btn">Pay Now</button>

            </StripeCheckout>
        </div>
    )
}