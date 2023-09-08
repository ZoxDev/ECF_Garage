import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function PrivateRoutes(){
    // Instance cookies
    const cookieTok = new Cookies({ path: '/' })
    const cookieRole = new Cookies({ path: '/'});

    // Get cookie
    const jwtToken = cookieTok.get("token")
    const role = cookieRole.get("role");

    
    let isAuth = false

    if(jwtToken != undefined){
       isAuth = true
    }

    // If employee try to access Admin dashboard
    if(isAuth == true && role == 'employee'){
        return <Navigate to='/dashboard/employee'/>
    }

    // All privates routes
    return(
        isAuth ? <Outlet/> : <Navigate to='/se-connecter'/>
    )
}