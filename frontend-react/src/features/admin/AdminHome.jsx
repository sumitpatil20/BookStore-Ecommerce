/* 
Admin Dashboard

Add Book
Show Book Table
Delete Book
Redirect to Edit
*/
import {
    Container,
    Alert,
    Form,
    Row,
    Col,
    Button,
    Table,
    Modal
} from "react-bootstrap";

import {
    addBook,
    fetchBooks,
    deleteBookById
} from "./adminService";

import { useEffect , useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { bookSchema } from "./adminValidation";

function AdminHome(){

    const navigate = useNavigate();

    // book list state
    const [books , setBooks] = useState([]);

    // modal state
    const [showModal , setShowModal] = useState(false);

    // selected book id for delete
    const [selectedBookId , setSelectedBookId] = useState(0);

    // react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState : { errors }
    } = useForm({

        resolver : yupResolver(bookSchema),

        defaultValues : {
            title : '',
            author : '',
            price : ''
        }
    });

    // fetch books from db
    const getBooks = async()=>{

        try{

            const response = await fetchBooks();

            setBooks(response.data);

        }
        catch(error){

            toast.error("Error fetching books");
        }
    }

    // first render
    useEffect(()=>{

        getBooks();

    },[]);

    // add book submit
    const onSubmit = async(data)=>{

        try{

            await addBook(data);

            toast.success("Book Added Successfully");

            // clear form
            reset();

            // reload table
            getBooks();

        }
        catch(error){

            toast.error("Error adding book");
        }
    }

    // delete book
    const deleteBook = async()=>{

        try{

            await deleteBookById(selectedBookId);

            toast.success("Book Deleted");

            setShowModal(false);

            getBooks();

        }
        catch(error){

            toast.error("Delete Failed");
        }
    }

    return(

        <Container className="mt-4">

            {/* PAGE HEADING */}
            <Alert variant="dark">
                <h3>Admin Dashboard</h3>
            </Alert>

            {/* ADD BOOK FORM */}
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>

                    {/* TITLE */}
                    <Col lg={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Book Title</Form.Label>

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
                    <Col lg={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Author</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter Author"
                                {...register("author")}
                                isInvalid={!!errors.author}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.author?.message}
                            </Form.Control.Feedback>

                        </Form.Group>

                    </Col>

                    {/* PRICE */}
                    <Col lg={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Price</Form.Label>

                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                {...register("price")}
                                isInvalid={!!errors.price}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.price?.message}
                            </Form.Control.Feedback>

                        </Form.Group>

                    </Col>

                </Row>

                {/* ADD BUTTON */}
                <Button variant="dark" type="submit">
                    Add Book
                </Button>

            </Form>

            {/* BOOK TABLE */}
            <Table
                striped
                bordered
                hover
                responsive
                className="mt-4"
            >

                <thead>

                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        books.map((book)=>{

                            return(

                                <tr key={book.book_id}>

                                    <td>{book.book_id}</td>

                                    <td>{book.title}</td>

                                    <td>{book.author}</td>

                                    <td>₹{book.price}</td>

                                    <td>

                                        {/* DELETE */}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="me-2"

                                            onClick={()=>{

                                                setShowModal(true);

                                                setSelectedBookId(
                                                    book.book_id
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>

                                        {/* EDIT */}
                                        <Button
                                            variant="primary"
                                            size="sm"

                                            onClick={()=>{

                                                // redirect to update component
                                                navigate(
                                                    `/admin/update-book/${book.book_id}`
                                                );
                                            }}
                                        >
                                            Edit
                                        </Button>

                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>

            </Table>

            {/* DELETE CONFIRM MODAL */}
            <Modal
                show={showModal}
                onHide={()=>setShowModal(false)}
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Confirm Delete
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    Are you sure you want to delete this book ?

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="success"
                        onClick={deleteBook}
                    >
                        Yes
                    </Button>

                    <Button
                        variant="danger"
                        onClick={()=>setShowModal(false)}
                    >
                        No
                    </Button>

                </Modal.Footer>

            </Modal>

        </Container>
    )
}

export default AdminHome;