// Shared layout for all admin pages
import AdminNavbar from "../components/navbar/AdminNavbar";

import { Outlet , Navigate } from "react-router-dom";

function AdminLayout(){

    // read role from browser
    const role = localStorage.getItem("role");

    // block non-admin users
    if(role !== "admin"){

        return <Navigate to="/signin"/>
    }

    return(
        <>

            {/* navbar */}
            <AdminNavbar/>

            {/* child page renders here */}
            <Outlet/>

        </>
    )
}

export default AdminLayout;