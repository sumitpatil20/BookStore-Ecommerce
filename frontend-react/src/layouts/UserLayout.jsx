import UserNavbar from "../components/navbar/UserNavbar";

import { Outlet , Navigate } from "react-router-dom";

function UserLayout(){

    const role = localStorage.getItem("role");

    // protect routes
    if(role !== "user"){

        return <Navigate to="/signin"/>
    }

    return(
        <>

            <UserNavbar/>

            <Outlet/>

        </>
    )
}

export default UserLayout;