const express = require('express')
const router = express.Router()
const Pizza = require('../models/pizzaModel')



router.get("/getallpizzas" , async(req, res) => {

    try {
        const pizzas = await Pizza.find({})
        res.send(pizzas)
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

router.post('/addpizza' , async(req , res) =>{

    const pizza= req.body.pizza

    try{
        const newpizza = new Pizza({
            name : pizza.name,
            image : pizza.image,
            description : pizza.description,
            prices : [pizza.prices],
            varients : ['small' , 'medium' , 'large'],
            category : pizza.category,
        })
        await newpizza.save()
        res.send('New Pizza Added Successfully')

    }catch(error){
        res.status(400).json({message : 'something went wrong'})
    }
});

router.post('/getpizzabyid', async (req , res)=>{
    const pizzaid = req.body.pizzaid
    try{ 
        const pizza = await Pizza.findOne({_id: pizzaid})
        res.send(pizza)
    }catch(error){
        res.status(400).json({message : 'something went wrong'})
    }
})

router.post('/editpizza' , async (req, res)=>{
    const editedpizza = req.body.editedpizza
    try{ 
        const pizza = await Pizza.findOne({_id: editedpizza._id})

        pizza.name = editedpizza.name
        pizza.description = editedpizza.description
        pizza.image = editedpizza.image
        pizza.category = editedpizza.category
        pizza.prices = [editedpizza.prices]

        await pizza.save()
        res.send('Pizza Details Edited Successfully')

    }catch(error){
        res.status(400).json({message : 'something went wrong'})
    }
})

router.post('/deletepizza' , async(req, res)=>{

    const pizzaid = req.body.pizzaid
try{
    await Pizza.findOneAndDelete({_id: pizzaid})
    res.send('Pizza Deleted Successfully')
    
}catch(error){
    res.status(400).json({message : 'something went wrong'})
}
    
    

})


module.exports = router;