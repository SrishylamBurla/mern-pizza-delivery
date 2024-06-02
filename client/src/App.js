import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route , Link, Switch } from 'react-router-dom'
import { Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import 'bootstrap'
import Ordersscreen from './screens/Ordersscreen';
import Adminscreen from './screens/Adminscreen';




function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
      <Route path='/' exact Component={Homescreen} />
      <Route path='/cart' exact Component={Cartscreen} />
      <Route path='/login' exact Component={Loginscreen} />
      <Route path='/register' exact Component={Registerscreen} />
      <Route path='/orders' exact Component={Ordersscreen} />
      <Route path='/admin/*' Component={Adminscreen}/>
      </Routes>
      </BrowserRouter>
     
      

    </div>
  );
}

export default App;
