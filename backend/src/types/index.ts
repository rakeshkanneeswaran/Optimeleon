import { array, ParseStatus, string, z } from 'zod'

const createPojectSchema = z.object({
    name : z.string(),
    script : z.string(),
    

})

const signUpSchema = z.object({
    username: z.string(),
    password: z.string().max(10),
    firstName : z.string(),
    lastName : z.string()
})

const signInSchema = z.object({
    username: z.string(),
    password: z.string().max(10),
})

export { createPojectSchema, signInSchema , signUpSchema}