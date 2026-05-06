//  Search + Books + Add to Cart
import {
    Container,
    Alert,
    Form,
    Row,
    Col,
    Button
} from "react-bootstrap";

import {
    fetchBooks,
    addToCart,
    searchBook
} from "./userService";

import { useEffect , useState } from "react";

import { toast } from "react-toastify";

import BookCard from "../../components/book/BookCard";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { searchSchema } from "./userValidation";

function UserHome(){

    const navigate = useNavigate();

    // books state
    const [books , setBooks] = useState([]);

    // message state
    const [message , setMessage] = useState('');

    // react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState : { errors }
    } = useForm({

        resolver : yupResolver(searchSchema),

        defaultValues : {
            title : '',
            author : ''
        }
    });

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

    // search submit
    const onSubmit = async(data)=>{

        try{

            const response = await searchBook(
                data.title,
                data.author
            );

            setBooks(response.data);

            // no books found
            if(response.data.length === 0){

                setMessage(
                    "Sorry, The Book is not currently available in our Inventory"
                );

                // auto hide after 5 seconds
                setTimeout(()=>{

                    setMessage('');

                },5000);
            }

            reset();

        }
        catch(error){

            toast.error("Search Failed");
        }
    }

    // add to cart
    const handleAddToCart = async(bookId)=>{

        try{

            // check login
            const token = localStorage.getItem("token");

            if(!token){

                // redirect guest to login
                navigate("/signin");

                return;
            }

            await addToCart({
                book_id : bookId
            });

            toast.success("Book Added To Cart");

        }
        catch(error){

            toast.error("Error adding to cart");
        }
    }

    return(

        <Container className="mt-4">

            {/* HEADING */}
            <Alert variant="dark">
                <h3>User Home</h3>
            </Alert>

            {/* SEARCH FORM */}
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>

                    {/* TITLE */}
                    <Col lg={5}>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Search By Title
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter Book Title"
                                {...register("title")}
                                isInvalid={!!errors.title}
                            />

                            <Form.Control.Feedback type="invalid">

                                {errors.title?.message}

                            </Form.Control.Feedback>

                        </Form.Group>

                    </Col>

                    {/* AUTHOR */}
                    <Col lg={5}>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Author (Optional)
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter Author"
                                {...register("author")}
                            />

                        </Form.Group>

                    </Col>

                    {/* BUTTON */}
                    <Col lg={2}>

                        <Button
                            variant="dark"
                            type="submit"
                            className="mt-lg-4 w-100"
                        >
                            Search
                        </Button>

                    </Col>

                </Row>

            </Form>

            {/* NO BOOK MESSAGE */}
            {
                message &&
                <Alert variant="danger">
                    {message}
                </Alert>
            }

            {/* BOOK COLLECTION */}
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
                                    onAddToCart={handleAddToCart}
                                />

                            </Col>
                        )
                    })
                }

            </Row>

        </Container>
    )
}

export default UserHome;