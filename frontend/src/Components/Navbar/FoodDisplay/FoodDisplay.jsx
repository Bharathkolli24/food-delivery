import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../../Context/StoreContent'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    //We will get the food_list array using the context API
    const {food_list, isLoading} = useContext(StoreContext)
  return (
    <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="skeleton-card">
                  <div className="skeleton skeleton-img"></div>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-price"></div>
              </div>
              ))
            : food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                          key={index}
                          id={item._id}
                          name={item.name}
                          description={item.description}
                          price={item.price}
                          image={item.image}
                  />
                );
              }
              return null;
            })}
        </div>
    </div>
  )
}

export default FoodDisplay