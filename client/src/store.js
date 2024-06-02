import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllPizzasReducer , addPizzaReducer , getPizzaByIdReducer, editPizzaReducer} from './reducers/pizzaReducer'
import { getAllUserReducer, loginUserReducer, registerUserReducer } from './reducers/userReducer'
import { placeOrderReducer , getUserOrdersReducer, getAllOrdersReducer} from './reducers/orderReducer'


const finalReducer = combineReducers({
    getAllPizzasReducer: getAllPizzasReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    placeOrderReducer: placeOrderReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    addPizzaReducer : addPizzaReducer,
    getPizzaByIdReducer : getPizzaByIdReducer,
    editPizzaReducer : editPizzaReducer,
    getAllOrdersReducer : getAllOrdersReducer,
    getAllUserReducer : getAllUserReducer
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser
    }
}

const store = createStore(finalReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store