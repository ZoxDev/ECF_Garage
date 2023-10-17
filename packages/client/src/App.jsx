// Views
import Homepage from './views/HomePage/homepage.jsx';
import CarsPage from './views/CarsPage/carspage.jsx';
import Noticepage from './views/NoticePage/noticepage.jsx';
import LoginPage from './views/Login/login.jsx';
import AdminBack from './views/backoffice/Admin.jsx';
import Employee from './views/backoffice/Employee.jsx';

// Error views
import PageNotFound from './views/ErrorPages/PageNotFound.jsx';
import PageForbOrUnauth from './views/ErrorPages/PageForbidenUnauth.jsx';

// PrivateRoutes
import PrivateRoutes from './components/privateRoutes.jsx';

// Router
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

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

                <Route
                    path='/se-connecter'
                    element={<LoginPage />}
                />

                {/* Admin & Employee */}
                <Route element={<PrivateRoutes />}>
                    <Route element={<AdminBack />} path='/dashboard/admin' />
                    <Route element={<Employee />} path='/dashboard/employee'/>
                </Route>

                {/* Only phone */}
                <Route
                    path="/avis"
                    element={<Noticepage />}
                />

                {/* 404 | 401 | 403 | 503*/}
                <Route path="*" element={<PageNotFound />} />

                <Route path='/error' element={<PageForbOrUnauth errInfo={"none"} errName={"none"}/>}/>
            </>
        )
    );

    // Just return the router provider
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

