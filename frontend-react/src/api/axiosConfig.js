// This File : Central axios instance
// Automatically sends JWT token in headers

// axios library import
import axios from "axios";

// create axios instance
const instance = axios.create({
    baseURL: "http://localhost:9001"
});

// interceptor runs BEFORE every API request
instance.interceptors.request.use((config) => {

    // read token from browser localStorage
    const token = localStorage.getItem("token");

    // if token exists then attach Authorization header
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    // return updated config
    return config;
});

// export axios instance
export default instance;