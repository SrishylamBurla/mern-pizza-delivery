
import axios from 'axios';

export const getAllPizzas = () => async dispatch => {
    dispatch({ type: 'GET_PIZZAS_REQUEST' })

    try {
        const response = await axios.get('/api/pizzas/getallpizzas')
        console.log(response)
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_PIZZAS_FAILURE', payload: error })
    }

}

export const logoutUser = () => dispatch => {

    localStorage.removeItem('currentUser')
    window.location.href = "/login"
}

export const addPizza=(pizza)=> async dispatch=>{
    dispatch({type: 'ADD_PIZZA_REQUEST'})

    try{ 
        const response = await axios.post('/api/pizzas/addPizza' , {pizza})
        dispatch({type:'ADD_PIZZA_SUCCESS'})
        console.log(response)
    }catch(error){
        dispatch({type: 'ADD_PIZZA_FAILED' , payload: error})

    }
}

export const getPizzaById= (pizzaid) =>async dispatch => {
    dispatch({type: 'GET_PIZZABYID_REQUEST'})

    try{
        const response = await axios.post('/api/pizzas/getPizzaById', {pizzaid})
        console.log(response)
        dispatch({type: 'GET_PIZZABYID_SUCCESS' , payload : response.data})
    }catch(error){
        dispatch({type: 'GET_PIZZABYID_FAILED' , payload : error})
        
    }
}
export const editPizza= (editedpizza) =>async dispatch => {
    dispatch({type: 'EDIT_PIZZA_REQUEST'})

    try{
        const response = await axios.post('/api/pizzas/editpizza', {editedpizza})
        console.log(response)
        dispatch({type: 'EDIT_PIZZA_SUCCESS' , payload : response.data})
        window.location.href='/admin/pizzaslist'
    }catch(error){
        dispatch({type: 'EDIT_PIZZA_FAILED' , payload : error})
        
    }
}
export const deletePizza= (pizzaid) =>async dispatch => {
    

    try{
        const response = await await axios.post('/api/pizzas/deletepizza', {pizzaid})
        console.log(response)
        alert('Pizza deleted successfully')
        window.location.reload()
    }catch(error)
    {
        alert('Something went wrong')
        console.log(error)
    }
}



