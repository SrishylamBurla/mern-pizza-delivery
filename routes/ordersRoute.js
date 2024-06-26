const express = require('express')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51PKteVSIECe6Bgv6EPtD7EwDkIsSM5rSUnAdqk2AVUmvaASJfpzv7NKakTEKShRlmZVPyXL0Cp7VHWTBkAh0M8Qf00i0x8qTi0');
const router = express.Router();
const Order = require('../models/orderModel')

router.post('/placeorder', async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const paymentIntent = await stripe.paymentIntents.create({
            amount: subtotal * 100,
            customer: customer.id,
            currency: 'inr',
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        if (paymentIntent) {

            const neworder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: paymentIntent.id
            })
            neworder.save()
            res.send('Order placed successfully')
        } else {
            res.send('Payment failed')
        }

    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' + error })
    }
})

router.post('/getuserorders', async (req, res) => {
    const { userid } = req.body
    try {
        const orders = await Order.find({ userid : userid }).sort({_id : -1})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
    }
})

router.get("/getallorders" , async(req, res) => {

    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

router.post('/deliverorder' ,  async (req, res)=>{
    const orderid = req.body.orderid

    try{ 
        const order = await Order.findOne({_id: orderid})
        order.isDelivered=true
        await order.save()
        res.send('Order delivered successfully')
        

    }catch(error){
        return res.status(400).json({message: 'Something went wrong'})
    }
})

module.exports = router



