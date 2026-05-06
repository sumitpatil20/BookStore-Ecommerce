import {
    Container,
    Row,
    Col,
    Alert
} from "react-bootstrap";

import { useEffect , useState } from "react";

import { fetchBooks } from "../user/userService";

import BookCard from "../../components/book/BookCard";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function GuestHome(){

    const [books , setBooks] = useState([]);

    const navigate = useNavigate();

    // fetch all books
    const getBooks = async()=>{

        try{

            const response = await fetchBooks();

            setBooks(response.data);

        }
        catch(error){

            toast.error("Error fetching books");
        }
    }

    useEffect(()=>{

        getBooks();

    },[]);

    // redirect guest to signin
    const handleAddToCart = ()=>{

        toast.info("Please Login First");

        navigate("/signin");
    }

    return(

        <Container fluid className="px-4 mt-4">

            <Alert variant="dark">

                <h2 className="text-center">
                    Welcome To BookStore
                </h2>

            </Alert>

            <Row>

                {
                    books.map((book)=>{

                        return(

                            <Col
                                lg={4}
                                md={6}
                                className="mb-4"
                                key={book.book_id}
                            >

                                <BookCard

                                    book={book}

                                    addToCart={
                                        handleAddToCart
                                    }

                                />

                            </Col>
                        )
                    })
                }

            </Row>

        </Container>
    )
}

export default GuestHome;