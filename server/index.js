const express = require("express")
const morgan = require("morgan")
const db = require("./db/app")
require("dotenv").config()
const app = express();
const cors = require("cors")



const PORT = process.env.PORT || 8000;



// middleware

app.use(express.json())

app.use(cors())

// app.use((req, res, next)=>
// {
//     console.log("This is middleware")
//     next()
// })

//   app.use(morgan("dev"));


// get All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("select * from restaurants left join (select restaurant_id, count(*) , TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id");

        if (results && results.rows && results.rows.length) {
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: { restaurants: results.rows }
            })
        }
        else {
            res.status(400).json({
                status: "failed",
                results: 0,
                data: { restaurants: [] }
            })
        }

    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            results: 0,
            error: err,
            data: { restaurants: [] }
        })
    }
})


// get a restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query(`select * from restaurants left join (select restaurant_id, count(*) , TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id where id=$1`, [req.params.id]);
        const reviews = await db.query("SELECT * FROM reviews where restaurant_id = $1", [req.params.id]);
        if (result && result.rows && result.rows.length) {
            res.status(200).json({
                status: "success",
                data: {
                    restaurant:result.rows[0],
                    reviews: reviews.rows
                }
            })
        }
        else {
            res.status(404).json({
                status: "failed",
                data: { restaurant: {} }
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            error: err,
            data: { restaurant: [] }
        })
    }

})


// post  restraurant

app.post("/api/v1/restaurants/", async (req, res) => {
    try {
        const created = await db.query(`INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *`, [req.body.name, req.body.location, req.body.price_range])
        if (created.rowCount) {
            res.status(201).json({
                status: "success",
                created: created.rows[0],
            })
        }
        else {
            res.status(204).json({
                status: "failed",
                created: null
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            error: err,
            created: null
        })
    }
})


// update restaurant

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query('UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id=$4 returning *', [req.body.name, req.body.location, req.body.price_range, req.params.id])
        if (result.rowCount) {
            res.status(200).json({
                status: "success",
                updated: result.rows[0]
            })
        }
        else {
            res.status(404).json({
                status: "failed",
                updated: null,
            })
        }
    }
    catch (err) {
        res.status(500).json({ status: "failed", updated: null })
    }

})


//delete restaurant

app.delete("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const deletedReviews = await db.query(`DELETE FROM reviews WHERE restaurant_id=$1`,[req.params.id])
        const deleted = await db.query(`DELETE FROM  restaurants WHERE id=$1`, [req.params.id]);
        if (deleted.rowCount) {
            res.status(204).json({
                status: "success",
                deleteCount: 1
            })
        }
        else {
            res.status(404).json({
                status: "failed",
                deleteCount: 0,
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: "failed", deleteCount: 0, })
    }

})




// post a review

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *",
            [req.params.id, req.body.name, req.body.review, req.body.rating])
        //  console.log(res)
        if (result) {
            res.status(201).json(
                {
                    status: "success",
                    created: result.rows[0]

                })
        }
        else {
            res.status(204).json(
                {
                    status: "failed",
                    created: []
                })
        }


    }
    catch (err) {
        res.status(500).json(
            {
                status: "failed",
                created: []
            })
    }
})

app.listen(PORT, () => {
    console.log("Server is listening on port : ", PORT);
});