import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../../Context/StoreContent'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    //We will get the food_list array using the context API
    const {food_list} = useContext(StoreContext)
  return (
    <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if (category === "All" || category === item.category ) {   //If category is all then show all items or if category is same as item.category in that case we will get the product of particular category. === is a comparison operator
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              } 
            })}
        </div>
    </div>
  )
}

export default FoodDisplay