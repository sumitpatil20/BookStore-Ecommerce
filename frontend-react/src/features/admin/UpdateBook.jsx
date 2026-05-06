// Update existing book
import {
    Container,
    Alert,
    Form,
    Row,
    Col,
    Button
} from "react-bootstrap";

import { useEffect } from "react";

import {
    getBookById,
    updateBook
} from "./adminService";

import { toast } from "react-toastify";

import { useNavigate , useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

function UpdateBook(){

    // read book id from URL
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    // fetch book data
    const getBook = async()=>{

        try{

            const response = await getBookById(id);

            // fill form with existing data
            reset(response.data);

        }
        catch(error){

            toast.error("Error fetching book");
        }
    }

    useEffect(()=>{

        getBook();

    },[]);

    // update submit
    const onSubmit = async(data)=>{

        try{

            await updateBook(id,data);

            toast.success("Book Updated");

            // redirect to admin home
            navigate("/admin/home");

        }
        catch(error){

            toast.error("Update Failed");
        }
    }

    return(

        <Container className="mt-4">

            <Alert variant="dark">
                <h3>Update Book</h3>
            </Alert>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>

                    <Col lg={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Title</Form.Label>

                            <Form.Control
                                type="text"
                                {...register("title")}
                            />

                        </Form.Group>

                    </Col>

                    <Col lg={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Author</Form.Label>

                            <Form.Control
                                type="text"
                                {...register("author")}
                            />

                        </Form.Group>

                    </Col>

                    <Col lg={4}>

                        <Form.Group className="mb-3">

                            <Form.Label>Price</Form.Label>

                            <Form.Control
                                type="number"
                                {...register("price")}
                            />

                        </Form.Group>

                    </Col>

                </Row>

                <Button variant="dark" type="submit">
                    Update Book
                </Button>

            </Form>

        </Container>
    )
}

export default UpdateBook;