import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../actions/userActions'


function Userslist() {
    const dispatch = useDispatch()
    const userstate = useSelector(state=>state.getAllUserReducer)
    const { users, loading , error } = userstate

    useEffect(()=>{
        dispatch(getAllUsers())

    },[])
    return (
        <div>
            <h1>Users List</h1>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong'/>)}

            <table className='table table-striped table-bordered'>
                <thead className='thead table-dark'>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user=>{
                        return(
                            <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><i className='fa fa-trash' onClick={()=>dispatch(deleteUser(user._id))}></i></td>
                        </tr>
                        )
                        
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Userslist