import { Outlet } from "react-router-dom";

import GuestNavbar from "../components/navbar/GuestNavbar";

function GuestLayout(){

    return(

        <>

            <GuestNavbar/>

            <Outlet/>

        </>
    )
}

export default GuestLayout;