import { z } from "zod";

export const userSchema = z.object({
    _id: z.any().optional(),
    name: z.string({
        required_error: 'name is required.',
        invalid_type_error: 'name must be a string.'
    }).min(3, {
        message: 'name must be at least 3 character long.'
    }),
    email: z.string({
        required_error: 'email is required.',
        invalid_type_error: 'email must be a string.'
    }).email({
        message: 'email must be a valid email.'
    }),
    password: z.string({
        required_error: 'password is required.',
        invalid_type_error: 'password must be a string.'
    }).min(6, {
        message: 'password must be at least 6 character long.'
    }).optional(),
    active: z.boolean().optional(),
    role: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;