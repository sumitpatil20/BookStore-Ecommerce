// All user-side APIs
import axios from "../../api/axiosConfig";

// GET ALL BOOKS
export const fetchBooks = async()=>{
    return await axios.get("/books");
}

// SEARCH BOOK
export const searchBook = async(title,author)=>{

    return await axios.get(
        `/books/search/all?title=${title}&author=${author}`
    );
}

// ADD TO CART
export const addToCart = async(data)=>{

    return await axios.post(
        "/cart/add",
        data
    );
}
// GET CART ITEMS
export const fetchCart = async()=>{
    return await axios.get("/cart");
}

// REMOVE CART ITEM
export const removeCartItem = async(id)=>{
    return await axios.delete(`/cart/${id}`);
}

// PLACE ORDER
export const placeOrder = async()=>{

    return await axios.post(
        "/orders/place"
    );
}

// PAYMENT
export const makePayment = async(data)=>{

    return await axios.post(
        "/payments/pay",
        data
    );
}

// MY ORDERS
export const fetchMyOrders = async()=>{
    return await axios.get("/orders/my-orders");
}

// CANCEL ORDER
export const cancelOrder = async(id)=>{
    return await axios.delete(`/orders/${id}`);
}
// profile/contact APIs
// GET PROFILE
export const fetchProfile = async()=>{
    return await axios.get("/users/profile");
}

// UPDATE PROFILE
export const updateProfile = async(data)=>{
    return await axios.put("/users/profile",data);
}

// CONTACT
export const sendMessage = async(data)=>{
    return await axios.post("/contact",data);
}