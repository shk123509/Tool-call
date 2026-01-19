import { z } from 'zod';

export const usernamevalid = z.
    string()
    .min(2, "Minimum 2 lenght is required")
    .max(20, "Maximum 20 lenght is required")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');


export const signUpSchema = z.object(
    {
        username : usernamevalid,
        email: z.string()
        .email({ message: 'Invalid email address' }),
        password : z.
        string()
        .min(6, {message:"Minimum 6 character is required"})
        .max(20, {message : "Maximum 20 lenght"})
    }
)    