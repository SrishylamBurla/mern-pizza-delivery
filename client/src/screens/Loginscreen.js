import React from "react";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";


export default function Loginscreen() {
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')

    const loginstate = useSelector(state=>state.loginUserReducer)
    const {loading , error} = loginstate

    const dispatch = useDispatch()
    useEffect(()=>{
        if(localStorage.getItem('currentUser')){
            window.location.href='/'
        }

    },[])

    function login(){
        const user = {
            email,
            password
        }
        console.log(user)
        dispatch(loginUser(user))
    }
    

    return(
        <div className="row justify-content-center">
            <div className="col-md-4 mt-3 shadow-lg p-3 mb-5 bg-white rounded" style={{textAlign:'left'}}>
                {loading && <Loading />}
                {error && (<Error error='Invalid Credentials'/>)}

                <h2 className="m-2" style={{fontSize:'30px', textAlign:'center'}}>Login</h2>
            <input type="text" placeholder="Email" className="form-control" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e)=>{setpassword(e.target.value)}} />

            <button className="btn mt-3 mb-3" onClick={login}>LOGIN</button><br />
            <a style={{color:'black'}} href="/register">Click Here To Register</a>

            </div>
        </div>
    )
}