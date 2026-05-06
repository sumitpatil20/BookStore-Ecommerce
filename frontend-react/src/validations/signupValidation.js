// Validation rules for SignUp
import * as yup from 'yup';

export const signupSchema = yup.object({

    name : yup
        .string()
        .required("Name is required"),

    email : yup
        .string()
        .required("Email is required")
        .email("Invalid Email"),

    password : yup
        .string()
        .required("Password is required")
        .min(6,"Minimum 6 characters")

});