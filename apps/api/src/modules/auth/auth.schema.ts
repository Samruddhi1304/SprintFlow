import z from "zod";

export const registerSchema= z.object({
    name: z.string().nonempty(),
    email:  z.email(),
    password: z.string().min(6)
})

export type RegisterInput = z.infer<typeof registerSchema>;