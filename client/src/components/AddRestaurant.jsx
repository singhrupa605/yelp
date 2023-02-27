import React, { useState, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContextApi } from '../context/RestaurantContextApi';


const AddRestaurant = () => {

    const {addRestaurant} = useContext(RestaurantContextApi)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await RestaurantFinder.post("/", { name, location, price_range: priceRange });
            addRestaurant(response.data.created)
            }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='mb-4 mt-4'>
            <form action="" >
                <div className="form-row d-flex  justify-content-center">
                    <div className="col-3 px-2">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder='name' />
                    </div>
                    <div className="col-3 px-2">
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder='location' />
                    </div>
                    <div className="col-3 px-2">
                        <select className="form-select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
                </div>

            </form>
        </div>
    )
}

export default AddRestaurant