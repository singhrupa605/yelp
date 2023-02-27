import React, { useEffect, useContext, } from 'react'
import { useNavigate } from "react-router-dom"
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContextApi } from '../context/RestaurantContextApi';
import StarRating from './StarRating';

const RestaurantList = () => {


    let navigate = useNavigate()
    const { restaurants, setRestaurants } = useContext(RestaurantContextApi)


    const renderRating = (restaurant) => {

        if (restaurant.count) {
            return (
                <>
                    < StarRating rating={restaurant.average_rating} />
                    <span className='text-warning' >({restaurant.count})</span>
                </>
            )
        }
        else {
            return (
            <span className='text-center text-warning'>No reviews</span>)
        }

    }


const handleDelete = async(e, id) => {
    console.log("Inside delete ")
    e.stopPropagation()
    try {
        await RestaurantFinder.delete(`/${id}`)
        setRestaurants(restaurants.filter(res => res.id !== id))
    }
    catch (err) {
        console.log(err)
    }
}

const handleUpdate = async (e, id) => {
    e.stopPropagation();
    try {
        navigate(`restaurants/${id}/update`)
    }
    catch (err) {
        console.log(err)
    }
}


const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
}

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await RestaurantFinder.get("/")
            setRestaurants(response.data.data.restaurants)
        }
        catch (err) {
            console.log(err)
        }
    }
    fetchData()
}

    , [])

return (
    <div className='list-group d-flex flex-column align-items-center justify-content-center px-5 py-2 mb-4'>
        <table className="table table-hover table-dark">
            <thead>
                <tr>
                    <th className='bg-primary' scope='col'>Restaurant</th>
                    <th className='bg-primary' scope='col'>Location</th>
                    <th className='bg-primary' scope='col'>Price Range</th>
                    <th className='bg-primary' scope='col'>Ratings</th>
                    <th className='bg-primary' scope='col'>Edit</th>
                    <th className='bg-primary' scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants &&
                    restaurants.map((res) => (
                        <tr key={res.id} onClick={() => handleRestaurantSelect(res.id)}>
                            <td>{res.name}</td>
                            <td>{res.location}</td>
                            <td>{"$".repeat(res.price_range)}</td>
                            <td>{renderRating(res)}</td>
                            <td><button onClick={(e) => handleUpdate(e, res.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, res.id)} className="btn btn-danger">Delete</button></td>
                        </tr>))

                }

            </tbody>
        </table>
    </div>
)
}

export default RestaurantList