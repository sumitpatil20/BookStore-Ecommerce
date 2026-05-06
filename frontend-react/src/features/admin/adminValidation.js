// Validation rules for Add/Update Book form
import * as yup from 'yup';

export const bookSchema = yup.object({

    title : yup
        .string()
        .required("Book title is required"),

    author : yup
        .string()
        .required("Author name is required"),

    price : yup
        .number()
        .required("Price is required")
        .positive("Price must be positive")

});