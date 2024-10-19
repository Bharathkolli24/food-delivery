import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContent';
import axios from 'axios';

const verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();     //after successful payment we will get whether it is success is true or false 
    const success = searchParams.get('success')                
    const orderId = searchParams.get('orderId')
    const {url} = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async() => {
        try {
            const response = await axios.post(url+'/api/order/verify',{success,orderId})
            if (response.data.success) {
                console.log('Success:', success, 'Order ID:', orderId);
                navigate('/myorders')
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            navigate('/');
        }
    }
    useEffect(() => {
        verifyPayment()
    },[])

  return (
    <div className="verify">
        <div className="spinner">
            
        </div>
    </div>
)
}

export default verify