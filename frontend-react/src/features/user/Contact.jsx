// Contact Form
import {
    Container,
    Alert,
    Form,
    Row,
    Col,
    Button
} from "react-bootstrap";

import { sendMessage } from "./userService";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { contactSchema } from "../../validations/contactValidation";

function Contact(){

    const {
        register,
        handleSubmit,
        reset,
        formState : { errors }
    } = useForm({

        resolver : yupResolver(contactSchema)
    });

    // form submit
    const onSubmit = async(data)=>{

        try{

            await sendMessage(data);

            toast.success("Message Sent");

            reset();

        }
        catch(error){

            toast.error("Failed to send");
        }
    }

    return(

        <Container className="mt-4">

            <Alert variant="dark">
                <h3>Contact Us</h3>
            </Alert>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>

                    {/* EMAIL */}
                    <Col lg={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                {...register("email")}
                                isInvalid={!!errors.email}
                            />

                            <Form.Control.Feedback type="invalid">

                                {errors.email?.message}

                            </Form.Control.Feedback>

                        </Form.Group>

                    </Col>

                    {/* SUBJECT */}
                    <Col lg={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Subject</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter Subject"
                                {...register("subject")}
                            />

                        </Form.Group>

                    </Col>

                </Row>

                {/* MESSAGE */}
                <Form.Group className="mb-3">

                    <Form.Label>Message</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}

                        placeholder="Enter Message"

                        {...register("message")}

                        isInvalid={!!errors.message}
                    />

                    <Form.Control.Feedback type="invalid">

                        {errors.message?.message}

                    </Form.Control.Feedback>

                </Form.Group>

                <Button variant="dark" type="submit">

                    Send Message

                </Button>

            </Form>

        </Container>
    )
}

export default Contact;