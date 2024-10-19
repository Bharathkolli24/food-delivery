import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../Context/StoreContent';

const FoodItem = ({id,name,price,description,image}) => {

    // const [itemCount,setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)

  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img className="food-item-image" src={url+'/images/'+image} alt=""  />
            { !cartItems[id]   //if cartItems[id] is not 0 then execute below code 
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />  //This is for +(add) icon
                :<div className='food-item-counter'>    {/* This div is for -> After clicking the + icon It will show the - 1 + functionality  */}
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>

            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItem