import { array, ParseStatus, string, z } from 'zod'

const createPojectSchema = z.object({
    name: z.string(),
    script: z.string(),

})

const updatePojectSchema = z.object({
    name: z.string(),
    script: z.string(),
    id: z.string()
})


const signUpSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
})


const signInSchema = z.object({
    username: z.string(),
    password: z.string().max(10),
})

interface CustomRequest extends Request {
    userId: string;
}
export { createPojectSchema, signInSchema, signUpSchema, updatePojectSchema }