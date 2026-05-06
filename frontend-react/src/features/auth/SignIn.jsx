/* This File 
Login page
Stores token + role
Redirects based on role
*/


import { Container , Row , Col , Alert , Button , Form } from "react-bootstrap";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../validations/loginValidation";

import { login } from "./authService";

import { toast } from "react-toastify";

import { useNavigate , Link } from "react-router-dom";

function SignIn(){

    // hook for redirecting user to another component/page
    const navigate = useNavigate();

    // react-hook-form initialization
    const {
        register,
        handleSubmit,
        formState : { errors }
    } = useForm({

        // attach yup validation schema
        resolver : yupResolver(loginSchema),

        // initial values
        defaultValues : {
            email : '',
            password : ''
        }
    });

    // runs after form submit
    const onSubmit = async(data)=>{

        try{

            // API call to backend
            const response = await login(data);

            // store JWT token in browser
            localStorage.setItem("token",response.data.token);

            // store role (admin/user)
            localStorage.setItem("role",response.data.role);

            toast.success("Login Successful");

            // redirect based on role
            if(response.data.role === "admin"){

                // redirect admin to admin home page
                navigate("/admin/home");

            }
            else{

                // redirect user to home page
                navigate("/user/home");
            }

        }
        catch(error){

            toast.error(
                error?.response?.data?.message || "Login Failed"
            );
        }
    }

    return(

        <Container className="mt-5">

            <Row className="justify-content-center">

                <Col lg={5}>

                    <Alert variant="dark">
                        <h3 className="text-center">Sign In</h3>
                    </Alert>

                    {/* handleSubmit executes validation first */}
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        {/* EMAIL */}
                        <Form.Group className="mb-3">

                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="Enter Email"

                                // register field with RHF
                                {...register("email")}

                                // bootstrap invalid styling
                                isInvalid={!!errors.email}
                            />

                            {/* validation message */}
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
                            Login
                        </Button>

                    </Form>

                    {/* redirect to signup page */}
                    <div className="text-center mt-3">

                        Don't have account ?

                        <Link to="/signup">
                            Register Here
                        </Link>

                    </div>

                </Col>

            </Row>

        </Container>
    )
}

export default SignIn;