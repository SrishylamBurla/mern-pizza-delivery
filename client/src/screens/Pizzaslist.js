import React from 'react'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { deletePizza, getAllPizzas } from '../actions/pizzaActions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'




function Pizzaslist() {

    const dispatch = useDispatch()
    const pizzasstate = useSelector((state) => state.getAllPizzasReducer)
    const { pizzas, error, loading } = pizzasstate

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])
    return (
        <div>
            <h1>Pizzas List</h1>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            <table className='table table-bordered'>

                <thead className='thead table-dark'>
                    <tr>
                        <th>Name</th><br />
                        <th>Prices</th><br />
                        <th>Category</th><br />
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='tbody'>
                    {pizzas && pizzas.map(pizza => {
                        return <tr>
                            <td>{pizza.name}</td><br />
                            <td>
                               small : {pizza.prices[0]['small']}<br />
                               medium : {pizza.prices[0]['medium']}<br />
                               large : {pizza.prices[0]['large']}
                            </td><br />
                            <td>{pizza.category || 'no category'}</td><br />
                            <td>
                                <i className='fa fa-trash m-1' onClick={()=>dispatch(deletePizza(pizza._id))}></i>
                                <Link to={`/admin/editpizza/${pizza._id}`}><i className='fa fa-edit m-1'></i></Link>
                            </td>
                        </tr>


                    })}
                </tbody>

            </table>
        </div>
    )
}

export default Pizzaslist