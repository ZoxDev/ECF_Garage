import React from 'react'
import ReactDOM from 'react-dom/client'

import Homepage from './views/homepage.jsx';
import CarsPage from './views/carspage.jsx';
import Noticepage from './views/noticepage.jsx';
import LoginPage from './views/login.jsx';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";



  
  const isAuth = (authValue) => {
    console.log(authValue)
    return authValue
  }
  
  
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
        <Route
          path="/se-connecter"
          element={<LoginPage auth={isAuth}/>}
        />
    
      {/* Admin & Employee */}
        <Route 
          path="/"
        />


      {/* Only phone */}
        <Route
          path="/avis"
          element={<Noticepage />}
        />
  
      {/* 404 */}
      </>
    )
  );



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router}></RouterProvider>
    
  </React.StrictMode>,
)

