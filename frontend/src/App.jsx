import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Navbar/Footer/Footer'
import LoginPopup from './Components/Navbar/LoginPopup/LoginPopup'
import Verify from './pages/Verify/verify'
import MyOrders from './pages/MyOrders/myOrders'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/> :<></>}
    <ToastContainer/>
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>     {/* These are called as Route that will open the provided path when clicked. When we open this application it'll directly open the Home page */}
        <Route path='/Cart' element={<Cart/>}/> 
        <Route path='/Order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>            //Here we are returning two elements.If fragments( <> </> ) are not added then it'll give errors 
   )
}




export default App