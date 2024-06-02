import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { addPizza } from '../actions/pizzaActions'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Success from '../components/Success'


function Addpizza() {
    const [name , setname] = useState('')
    const [smallprice , setsmallprice] = useState()
    const [mediumprice, setmediumprice] = useState()
    const [largeprice, setlargeprice] = useState()
    const [description, setdescription] = useState('')
    const [image , setimage] = useState('')
    const [category , setcategory] = useState('')

    const addpizzastate = useSelector(state=>state.addPizzaReducer)
    const {success , error , loading} = addpizzastate
    const dispatch = useDispatch()
    function formHandler(e){
        e.preventDefault();
        const pizza = {
            name,
            image,
            description,
            prices : {
                small : smallprice,
                medium : mediumprice,
                large : largeprice
            }
        }
        console.log(pizza);
        dispatch(addPizza(pizza))
    }
    

  return (
    <div>
        <div className='col-md-8' style={{textAlign:'left'}}>
        <h1>Add New Pizza</h1>

        {loading && (<Loading />)}
        {error && (<Error error='Something went wrong'/>)}
        {success && (<Success success='New Pizza Added successfully'/>)}
        <form onSubmit={formHandler}>
            <input className='form-control' type='text' placeholder='name' value={name} onChange={(e)=>setname(e.target.value)} />
            <input className='form-control' type='text' placeholder='small varient price' value={smallprice} onChange={(e)=>setsmallprice(e.target.value)} />
            <input className='form-control' type='text' placeholder='medium varient price' value={mediumprice} onChange={(e)=>setmediumprice(e.target.value)} />
            <input className='form-control' type='text' placeholder='large varient price' value={largeprice} onChange={(e)=>setlargeprice(e.target.value)} />
            <input className='form-control' type='text' placeholder='description' value={description} onChange={(e)=>setdescription(e.target.value)} />
            <input className='form-control' type='text' placeholder='image url' value={image} onChange={(e)=>setimage(e.target.value)} />
            <input className='form-control' type='text' placeholder='category' value={category} onChange={(e)=>setcategory(e.target.value)} />
            <button className='btn mt-2 ' type='submit'>Add Pizza</button>
        </form>
        
    </div>
    </div>
    
  )
}

export default Addpizza