import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from "../actions/pizzaActions";



export default function Navbar() {

  
  const cartstate = useSelector(state => state.cartReducer)
  const { currentUser } = useSelector(state => state.loginUserReducer)
  const dispatch = useDispatch()

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">FEAST PIZZA</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {currentUser ? <div className="dropdown">
              <a className="dropdown-toggle nav-account mt-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentUser.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="/orders">Orders</a>
                <a className="dropdown-item" href="#" onClick={()=>dispatch(logoutUser())}><li>Logout</li></a>
              </div>
            </div> : <a className="nav-item nav-link" href="/login">Login</a>}


            <a className="nav-item nav-link" href="/cart">Cart {cartstate.cartItems.length} </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
