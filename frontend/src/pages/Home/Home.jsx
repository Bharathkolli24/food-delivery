import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Navbar/Header/Header'
import ExploreMenu from '../../Components/Navbar/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/Navbar/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/Navbar/AppDownload/AppDownload'

const Home = () => {
  const [category,setCategory] = useState("All");

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home
