import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import { RestaurantContextApi } from '../context/RestaurantContextApi';
import StarRating from '../components/StarRating';


const RestaurantdetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContextApi);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData()
  },[])


  return (
   selectedRestaurant["restaurant"]&& <div> <h1 className='text-center display-1 text-capitalize'>{selectedRestaurant["restaurant"]["name"]}</h1>
   <h2 className='text-center'><StarRating rating={selectedRestaurant["restaurant"]["average_rating"]} /><span className='text-warning'>({selectedRestaurant["restaurant"]["count"]})</span></h2>
   <div className='d-flex flex-column m-5'>
    {selectedRestaurant["reviews"].length? <Reviews  reviews={selectedRestaurant["reviews"]}/> : <h3 className='text-center mb-5'>No reviews yet, be the first to review.</h3>}
    <AddReview restaurant_id={selectedRestaurant["restaurant"]["id"]}  />
   </div>
   
    </div>
  )
}

export default RestaurantdetailPage