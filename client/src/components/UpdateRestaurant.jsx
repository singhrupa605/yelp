import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import RestaurantFinder from "../apis/RestaurantFinder"

const UpdateRestaurant = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            }
            catch (err) {
                console.log(err)
            }
        }
        getRestaurant()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
             await RestaurantFinder.put(`/${id}`, { name, location, price_range: priceRange })
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='d-flex flex-column align-items-center mt-4 justify-content-center'>
            <form action="" style={{ width: "60%" }}>
                <div className="form-group py-3">
                    <label htmlFor='name'>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' id="name" />
                </div>

                <div className="form-group py-3 ">
                    <label htmlFor="location" >Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className='form-control' id='location' />
                </div>

                <div className="form-group py-3">
                    <label htmlFor="price_range">Price Range</label>
                    <select className="form-select" id='price_range' value={priceRange} onChange={(e) => setPriceRange(e.target.value)} >
                        <option defaultValue="1" >1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <button className='btn btn-primary -5' onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default UpdateRestaurant