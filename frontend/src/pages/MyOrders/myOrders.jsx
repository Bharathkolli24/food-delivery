import React, { useContext, useEffect, useState } from 'react'
import './myOrders.css'
import { StoreContext } from '../../Context/StoreContent'
import axios from 'axios'
import { assets } from '../../assets/assets'

const myOrders = () => {

    const {url,token} = useContext(StoreContext)     //backend url and authentication token
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
      const response = await axios.post(url+'/api/order/userorders',{},{headers:{token}})
      setData(response.data.data); 
    }
    useEffect(() => {
      if (token) {
        fetchOrders();
      }
    },[token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map ((order,index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item,index)=>{   
                if (index=== order.items.length-1) {    // here items is the name of the array of orders... using this we can access the last item of the user order                   
                  return item.name+" x "+item.quantity
                } else {
                  return item.name+" x "+item.quantity+", "
                }
              })}</p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>   {/* &#x25cf; is a hex code for this ● symbol */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default myOrders