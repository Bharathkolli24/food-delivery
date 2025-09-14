import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    // const url = 'https://food-delivery-backend-bkny.onrender.com'
    const url = 'http://localhost:4000'
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    //functionality for add to cart
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){                                         //If provided itemId is not present in the cart. If user is adding the item first item in tha cart this statement wil executes 
            setCartItems((prev)=>({...prev,[itemId]:1}))                //FIrst we are passing the previous cart data. In that previous cart data we will set the item... Here we are defining the object id where we will define the item id and value will be 1
        }
        else{                                                           //Incase if the product is already available in the cart then it will increase the quantity by one we use this else statement
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))   //It will increase by one
        }
        if (token) {   //if we have token then the user is logged in
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})   // we will get itemId and we will set the token in the header                            // whatever item is added in the cart that will added in the database also 
        }
    }

    //functionality to remove from the cart
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item) //if our product id is matching with the item that is the key value of cart items it means this product is available in the cart
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(url+'/api/food/list')  // 48
            setFoodList(response.data.data)
        } catch (error) {
            console.error("Error fetching food items:", error);   // 51
        } finally {
            setIsLoading(false);
        }
    }
    const loadCartData = async (token) => {                // this function is for not to lost cartData(item quantity) after reloading the page
        const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
        setCartItems(response.data.cartData || {})
    }

    useEffect(() => {                               //if we didn't write this useEffect arrow function we will get logged out if we reloaded our page 
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))            // this is fpr storing cartData remains same even after page reload
            } 
        }
        loadData()
    },[])

    const contextValue = {
        food_list,         // with the help of this context we can access the food_list array anywhere    
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        isLoading
    }
    return (
        <StoreContext.Provider value = {contextValue}>   {/*if we add any element in the object above we can access that element in any component using context   */}
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
