import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import { RestaurantContextApiProvider } from './context/RestaurantContextApi';
const App = () => {
    return (
        < RestaurantContextApiProvider>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
                <Route exact path="/restaurants/:id" element={<RestaurantdetailPage />} />
            </Routes>
        </RestaurantContextApiProvider>

    )
}
export default App;