// Profile form validation
import * as yup from 'yup';

export const profileSchema = yup.object({

    name : yup
        .string()
        .required("Name is required"),

    email : yup
        .string()
        .required("Email is required")
        .email("Invalid Email")

});