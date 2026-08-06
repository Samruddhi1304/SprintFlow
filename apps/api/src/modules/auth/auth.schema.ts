import z from "zod";

export const registerSchema= z.object({
    name: z.string().nonempty(),
    email:  z.email(),
    password: z.string().min(6)
})

export const loginSchema= registerSchema.omit({
    name:true,
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput= z.infer<typeof loginSchema>;