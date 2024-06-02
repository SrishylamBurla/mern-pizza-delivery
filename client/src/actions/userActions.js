import axios from 'axios'

export const registerUser = (user) => async dispatch => {
    dispatch({ type: 'USER_REGISTER_REQUEST' })

    try {
        const response = await axios.post("/api/users/register", user)
        console.log(response)
        dispatch({ type: 'USER_REGISTER_SUCCESS'})
    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAILURE', payload: error })
    }
    
}

export const loginUser = (user) => async dispatch =>{
    dispatch({type: 'USER_LOGIN_REQUEST'})
    try {
        const response = await axios.post("/api/users/login", user)
        console.log(response)
        dispatch({ type: 'USER_LOGIN_SUCCESS' , payload: response.data})
        localStorage.setItem('currentUser' , JSON.stringify(response.data))
        window.location.href='/'
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILURE', payload: error })
    }
}

export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'GET_USERS_REQUEST' })

    try {
        const response = await axios.get('/api/users/getallusers')
        console.log(response)
        dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_USERS_FAILURE', payload: error })
    }

}

export const deleteUser= (userid) =>async dispatch => {
    

    try{
        const response = await await axios.post('/api/users/deleteuser', {userid})
        console.log(response)
        alert('User deleted successfully')
        window.location.reload()
    }catch(error)
    {
        alert('Something went wrong')
        console.log(error)
    }
}