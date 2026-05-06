// Contact form validation
import * as yup from 'yup';

export const contactSchema = yup.object({

    email : yup
        .string()
        .required("Email is required")
        .email("Invalid Email"),

    subject : yup
        .string(),

    message : yup
        .string()
        .required("Message is required")

});