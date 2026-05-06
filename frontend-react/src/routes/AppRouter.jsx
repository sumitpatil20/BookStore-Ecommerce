// Main routing flow
import { BrowserRouter , Routes , Route } from "react-router-dom";

import SignIn from "../features/auth/SignIn";

import SignUp from "../features/auth/SignUp";

import GuestNavbar from "../components/navbar/GuestNavbar";

import AdminLayout from "../layouts/AdminLayout";

import AdminHome from "../features/admin/AdminHome";

import UpdateBook from "../features/admin/UpdateBook";

import UserLayout from "../layouts/UserLayout";

import UserHome from "../features/user/UserHome";

import Cart from "../features/user/Cart";

import MyOrders from "../features/user/MyOrders";

import Profile from "../features/user/Profile";

import Contact from "../features/user/Contact";

import UserList from "../features/admin/UserList";

import AdminProfile from "../features/admin/AdminProfile";

import GuestLayout from "../layouts/GuestLayout";

import GuestHome from "../features/guest/GuestHome";

function AppRouter(){

    return(

        <BrowserRouter>

            <Routes>

                {/* GUEST */}
                <Route path="/" element={<GuestLayout/>}>

                <Route
                    index
                    element={<GuestHome/>}
                />

                </Route>

                {/* AUTH */}
                <Route path="/signin" element={<SignIn/>}/>

                <Route path="/signup" element={<SignUp/>}/>

                {/* USER */}
                <Route path="/user" element={<UserLayout/>}>

                    <Route path="home" element={<UserHome/>}/>

                    <Route path="cart" element={<Cart/>}/>

                    <Route path="orders" element={<MyOrders/>}/>

                    <Route path="profile" element={<Profile/>}/>

                    <Route path="contact" element={<Contact/>}/>

                </Route>

                {/* ADMIN */}
                <Route path="/admin" element={<AdminLayout/>}>

                    <Route path="home" element={<AdminHome/>}/>

                    <Route path="users" element={<UserList/>}/>

                    <Route path="profile" element={<AdminProfile/>}/>

                    <Route
                        path="update-book/:id"
                        element={<UpdateBook/>}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter;