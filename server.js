



const express = require('express');
const Pizza = require('./models/pizzaModel.js')
const db = require('./db.js'); 
const path = require('path');

const app = express();

app.use(express.json());

const pizzasRoute = require("./routes/pizzasRoute.js")
const userRoute = require('./routes/userRoute.js')
const ordersRoute = require('./routes/ordersRoute.js')

app.use("/api/pizzas/" , pizzasRoute)
app.use('/api/users/' , userRoute)
app.use("/api/orders/" , ordersRoute)

__dirname = path.resolve();
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, "/client/build")))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}else{
  app.get('/', (req, res) => {
    const port = process.env.PORT || 5000;
    res.send('Server is working on port ' + port);
  });
}




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
