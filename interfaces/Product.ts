import {z} from "zod";

export const productSchema = z.object({
    _id: z.any().optional(),
    name: z.string({
        required_error: 'name is required.',
        invalid_type_error: 'name must be a string.'
    }).min(3, {
        message: 'name must be at least 3 character long.'
    }),
    price: z.number({
        required_error: 'price is required.',
        invalid_type_error: 'name must be a number.'
    }).min(0, {
        message: 'price must be greater than 0.'
    }),
    stock: z.number({
        required_error: 'stock is required.',
        invalid_type_error: 'stock must be a number.'
    }).min(0, {
        message: 'stock must be greater than 0.'
    }),
    active: z.boolean().optional(),
    description: z.string({
        invalid_type_error: 'description '
    }),
    images: z.array(z.string()).optional(),
})

export type Product = z.infer<typeof productSchema>