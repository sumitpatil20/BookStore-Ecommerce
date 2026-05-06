// Yup validation schema for SignIn form
import * as yup from 'yup';

// validation rules
export const loginSchema = yup.object({

    email : yup
        .string()
        .required("Email is required")
        .email("Invalid email"),

    password : yup
        .string()
        .required("Password is required")
        .min(6,"Minimum 6 characters")

});