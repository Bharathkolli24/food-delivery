import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContent'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState({    // this state variable is for delivery information of users in order page after proceed to checkout 
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data=> ({...data,[name]:value}))    // we will set the latest value which we will get from this event 
  }
  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = [] // in this we add the cart Item related data
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]      //using this id we will get the all quantity in this itemInfo quantity property 
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,        // above we have created a data state variable that will store in this address
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    try { 
      let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url)    // we have to send the user on this session_url
      } else {
        alert('Error:' + response.data.message)
      }
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    }
  }
  const navigate = useNavigate()
  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    } else if(getTotalCartAmount()===0) {
      navigate('/cart')
    }
  })

  return (
    <form onSubmit={placeOrder} className="place-order">

      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='ZipCode'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder