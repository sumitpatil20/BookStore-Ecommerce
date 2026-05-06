// All admin backend API calls
import axios from "../../api/axiosConfig";

// ADD BOOK
export const addBook = async(data)=>{
    return await axios.post("/books",data);
}

// GET ALL BOOKS
export const fetchBooks = async()=>{
    return await axios.get("/books");
}

// DELETE BOOK
export const deleteBookById = async(id)=>{
    return await axios.delete(`/books/${id}`);
}

// GET BOOK BY ID
export const getBookById = async(id)=>{
    return await axios.get(`/books/${id}`);
}

// UPDATE BOOK
export const updateBook = async(id,data)=>{
    return await axios.put(`/books/${id}`,data);
}

// GET ALL USERS
export const fetchUsers = async()=>{
    return await axios.get("/users/all");
}