import React , {useContext, useState, createContext }from 'react'



export  const RestaurantContextApi  = createContext();
export const RestaurantContextApiProvider = props => {


   const [restaurants, setRestaurants] = useState([]);
   const [selectedRestaurant, setSelectedRestaurant] = useState([]);

 
   const addRestaurant = (restaurant)=>
   {
      setRestaurants([...restaurants, restaurant])

   }

   const addReview = (review)=>
   {
     console.log(selectedRestaurant)
    setSelectedRestaurant({...selectedRestaurant , reviews : [...selectedRestaurant.reviews , review]})
    window.location.reload()
   }
 
    return(
        
      <RestaurantContextApi.Provider value={{restaurants, setRestaurants, addRestaurant, selectedRestaurant, setSelectedRestaurant, addReview}}>
        {props.children}
      </RestaurantContextApi.Provider>
    )
    }