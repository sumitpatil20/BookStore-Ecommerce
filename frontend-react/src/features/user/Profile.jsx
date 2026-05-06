// User Profile Page
import {
    Container,
    Alert,
    Form,
    Row,
    Col,
    Button
} from "react-bootstrap";

import {
    fetchProfile,
    updateProfile
} from "./userService";

import { useEffect , useState } from "react";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { profileSchema } from "../../validations/profileValidation";

function Profile(){

    // disable form initially
    const [disabled , setDisabled] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState : { errors }
    } = useForm({

        resolver : yupResolver(profileSchema)
    });

    // fetch user profile
    const getProfile = async()=>{

        try{

            const response = await fetchProfile();

            // fill form
            reset(response.data);

        }
        catch(error){

            toast.error("Error fetching profile");
        }
    }

    useEffect(()=>{

        getProfile();

    },[]);

    // update profile
    const onSubmit = async(data)=>{

        try{

            await updateProfile(data);

            toast.success("Profile Updated");

            // disable again
            setDisabled(true);

        }
        catch(error){

            toast.error("Update Failed");
        }
    }

    return(

        <Container className="mt-4">

            <Alert variant="dark">
                <h3>My Profile</h3>
            </Alert>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>

                    {/* NAME */}
                    <Col lg={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                type="text"
                                disabled={disabled}
                                {...register("name")}
                                isInvalid={!!errors.name}
                            />

                            <Form.Control.Feedback type="invalid">

                                {errors.name?.message}

                            </Form.Control.Feedback>

                        </Form.Group>

                    </Col>

                    {/* EMAIL */}
                    <Col lg={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                disabled={true}
                                {...register("email")}
                            />

                        </Form.Group>

                    </Col>

                </Row>

                {/* BUTTONS */}
                {
                    disabled ?

                    <Button
                        variant="dark"

                        onClick={()=>
                            setDisabled(false)
                        }
                    >
                        Edit
                    </Button>

                    :

                    <Button
                        variant="success"
                        type="submit"
                    >
                        Save
                    </Button>
                }

            </Form>

        </Container>
    )
}

export default Profile;