// Search validation
import * as yup from 'yup';

export const searchSchema = yup.object({

    title : yup
        .string()
        .required("Book title is required")

});