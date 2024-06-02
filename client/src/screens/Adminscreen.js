import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Userslist from "./Userslist";
import Orderslist from "./Orderslist";
import Addpizza from "./Addpizza";
import Pizzaslist from "./Pizzaslist";
import Editpizza from "./Editpizza";

const Adminscreen = () => {

    const dispatch = useDispatch()
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        }
    }, [dispatch])
    return (
        <div>
            <div className="row justify-content-center">
                <h2 style={{ fontSize: '35px' }}>Admin Panel</h2>
                <div className="col-md-10">
                    <ul className="admin-functions">
                        <li><Link to='/admin/userslist'>Users List</Link></li>
                        <li><Link to='/admin/pizzaslist'>Pizzas List</Link></li>
                        <li><Link to='/admin/addpizza'>Add New Pizza</Link></li>
                        <li><Link to='/admin/orderslist'>Orders List</Link></li>
                    </ul>

                    <Routes>
                        <Route path="/" element={<Userslist />} />
                        <Route path="/userslist" element={<Userslist />} />
                        <Route path="/pizzaslist" element={<Pizzaslist />} />
                        <Route path="/addpizza" element={<Addpizza />} />
                        <Route path="/orderslist" element={<Orderslist />} />
                        <Route path="/editpizza/:pizzaid" element={<Editpizza />} />
                    </Routes>

                </div>
            </div>
        </div>
    )
}
export default Adminscreen
