// This File : All authentication API calls
// Keeps SignIn.jsx clean

import axios from "../../api/axiosConfig";

// LOGIN API
// Backend URL -> POST /auth/signin
export const login = async(data)=>{
    return await axios.post("/auth/signin",data);
}

// SIGNUP API
// Backend URL -> POST /auth/signup
export const register = async(data)=>{
    return await axios.post("/auth/signup",data);
}