import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editPizza, getPizzaById } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';



function Editpizza() {
  const [name, setname] = useState('')
  const [smallprice, setsmallprice] = useState()
  const [mediumprice, setmediumprice] = useState()
  const [largeprice, setlargeprice] = useState()
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')
  const [category, setcategory] = useState('')

  const dispatch = useDispatch()
  const { pizzaid } = useParams();
  const getpizzabyidstate = useSelector(state => state.getPizzaByIdReducer)
  const { loading, error, pizza } = getpizzabyidstate

  const editpizzastate = useSelector(state=>state.editPizzaReducer)
  const { editloading , editsuccess , editerror } = editpizzastate


  useEffect(() => {
    if (pizza) {
      if (pizza._id == pizzaid) {
        setname(pizza.name)
        setsmallprice(pizza.prices[0]['small'])
        setmediumprice(pizza.prices[0]['medium'])
        setlargeprice((pizza.prices[0]['large']))
        setdescription(pizza.description)
        setimage(pizza.image)
        setcategory(pizza.category)

      } else {
        dispatch(getPizzaById(pizzaid))
      }
    } else {
      dispatch(getPizzaById(pizzaid))
    }

  }, [pizza, dispatch])

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id : pizzaid ,
      name,
      image,
      description,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice
      }
    }
    dispatch(editPizza(editedpizza))
  }

  return (
    <div className='col-md-8' style={{ textAlign: 'left' }}>
      <h1>Edit Pizza</h1>
      <h1>Pizza Id : {pizzaid}</h1>

      {loading && (<Loading />)}
      {error && (<Error error='Something went wrong' />)}
      {editsuccess && (<Success success='Pizza details edited successfully'/>)}
      {editloading && (<Loading />)}

      <form onSubmit={formHandler}>
        <input className='form-control' type='text' placeholder='name' value={name} onChange={(e) => setname(e.target.value)} />
        <input className='form-control' type='text' placeholder='small varient price' value={smallprice} onChange={(e) => setsmallprice(e.target.value)} />
        <input className='form-control' type='text' placeholder='medium varient price' value={mediumprice} onChange={(e) => setmediumprice(e.target.value)} />
        <input className='form-control' type='text' placeholder='large varient price' value={largeprice} onChange={(e) => setlargeprice(e.target.value)} />
        <input className='form-control' type='text' placeholder='description' value={description} onChange={(e) => setdescription(e.target.value)} />
        <input className='form-control' type='text' placeholder='image url' value={image} onChange={(e) => setimage(e.target.value)} />
        <input className='form-control' type='text' placeholder='category' value={category} onChange={(e) => setcategory(e.target.value)} />
        <button className='btn mt-2 ' type='submit'>Edit Pizza</button>
      </form>
    </div>
  )
}

export default Editpizza