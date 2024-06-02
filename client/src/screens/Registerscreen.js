import React from "react";
import { useState , useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux'
import {registerUser} from '../actions/userActions'
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
export default function Registerscreen() {
    const [name , setname] = useState('')
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const [cpassword , setcpassword] = useState('')


    const dispatch = useDispatch()
    const registerstate = useSelector(state=>state.registerUserReducer)
    const {loading , success , error} = registerstate

    function register(){
        if(password!==cpassword){
            alert("password not matched")
        }else{
            const user={
                name,
                email,
                password
            }
            console.log(user)
            dispatch(registerUser(user))

        }
    }
 
    return(
        <div className="row justify-content-center mt-5">
            <div className="col-md-4 mt-3 shadow-lg p-3 mb-5 bg-white rounded" style={{textAlign:'left'}}>
                {loading && <Loading />}
                {success && <Success success='User Registered successfully'/>}
                {error && <Error error='Email already registered'/>}
                

                <h2 className="m-2" style={{fontSize:'30px', textAlign:"center"}}>Register</h2>
                <div>
                    <input required type="text" placeholder="Name" className="form-control" value={name} onChange={(e)=>{setname(e.target.value)}} />
                    <input required type="text" placeholder="Email" className="form-control" value={email} onChange={(e)=> {setemail(e.target.value)}} />
                    <input required type="text" placeholder="Password" className="form-control" value={password} onChange={(e)=> {setpassword(e.target.value)}}/>
                    <input required type="text" placeholder="Confirm password" className="form-control" value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                    
                    <button className="btn mt-3 mb-3" onClick={register}>Register</button>
                    <br />
                    <a href="/login" style={{color:'black'}}>Click Here To Login</a>
                </div>

            </div>
            
        </div>
    )
}