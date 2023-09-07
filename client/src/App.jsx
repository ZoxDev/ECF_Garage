// Views
import Homepage from './views/homepage.jsx';
import CarsPage from './views/carspage.jsx';
import Noticepage from './views/noticepage.jsx';
import LoginPage from './views/login.jsx';
import Dashboard from './views/dashboard.jsx';

// Router
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

// Utils
import { useState, useEffect } from 'react';



export default function App() {
    const router = createBrowserRouter(

        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={<Homepage />}
                />
                <Route
                    path="/ventes"
                    element={<CarsPage />}
                />



                {/* Admin & Employee */}
                

                {/* Only phone */}
                <Route
                    path="/avis"
                    element={<Noticepage />}
                />

                {/* 404 */}
            </>
        )
    );


    // Just return the router provider
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

