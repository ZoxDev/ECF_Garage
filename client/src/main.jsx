import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './views/homepage.jsx';
import CarsPage from './views/carspage.jsx';
import Noticepage from './views/noticepage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/ventes",
    element: <CarsPage/>,
  },
  {
    path: "/se-connecter",
    element: <CarsPage></CarsPage>,
  },


  // Only phone
  {
    path: "/avis",
    element: <Noticepage/>,
  },


  // 404
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
