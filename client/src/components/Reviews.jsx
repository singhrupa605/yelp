import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {

    return (
        <div className="row row-cols-3  mb-2">
            {reviews.length && reviews.map((review) => (
                <div className="card text-white bg-primary m-2" key={review.id} style={{ maxWidth: "30%" }}>
                    <div className="card-header">
                        <h4>{review.name}</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="card-text mt-3">{review.review}</p>
                    </div>
                </div>
            ))}



        </div>
    )
}

export default Reviews