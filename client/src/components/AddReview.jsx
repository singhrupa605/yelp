import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContextApi } from '../context/RestaurantContextApi';




const AddReview = () => {

    const {id} = useParams();
    console.log(id)
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("");
    const { addReview } = useContext(RestaurantContextApi)

    const handleSubmit = async (e) => {          
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, { name, review: reviewText, rating })
            addReview(response.data.created); 

        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='mt-4'>
            <form action="">
                <div className="form-row d-flex">
                    <div className="form-group col-7">
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='name' id='name' />
                    </div>
                    <div className="form-group col-3 mx-4">
                        <label htmlFor="rating">Rating</label>
                        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="form-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group col-6 mt-3">
                    <label htmlFor="review">Review</label>
                    <textarea id="review" onChange={(e) => setReviewText(e.target.value)} value={reviewText} className='form-control'>
                    </textarea>
                </div>
                <div className="btn btn-primary mt-4" onClick={handleSubmit}>Submit</div>
            </form>
        </div>
    )
}

export default AddReview