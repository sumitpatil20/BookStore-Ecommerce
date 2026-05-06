import { Container , Row , Col , Alert , Button , Form } from "react-bootstrap";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "../../validations/signupValidation";

import { register as registerUser } from "./authService";

import { toast } from "react-toastify";

import { useNavigate , Link } from "react-router-dom";

function SignUp(){

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState : { errors }
    } = useForm({

        resolver : yupResolver(signupSchema),

        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    });

    const onSubmit = async(data)=>{

        try{

            // signup API call
            await registerUser(data);

            toast.success("Registration Successful");

            // redirect to signin page
            navigate("/signin");

        }
        catch(error){

            toast.error(
                error?.response?.data?.message || "Registration Failed"
            );
        }
    }

    return(

        <Container className="mt-5">

            <Row className="justify-content-center">

                <Col lg={5}>

                    <Alert variant="dark">
                        <h3 className="text-center">Sign Up</h3>
                    </Alert>

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        {/* NAME */}
                        <Form.Group className="mb-3">

                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                {...register("name")}
                                isInvalid={!!errors.name}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>

                        </Form.Group>

                        {/* EMAIL */}
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

                        {/* PASSWORD */}
                        <Form.Group className="mb-3">

                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                {...register("password")}
                                isInvalid={!!errors.password}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>

                        </Form.Group>

                        <Button
                            variant="dark"
                            type="submit"
                            className="w-100"
                        >
                            Register
                        </Button>

                    </Form>

                    {/* redirect to login */}
                    <div className="text-center mt-3">

                        Already have account ?

                        <Link to="/signin">
                            Login Here
                        </Link>

                    </div>

                </Col>

            </Row>

        </Container>
    )
}

export default SignUp;