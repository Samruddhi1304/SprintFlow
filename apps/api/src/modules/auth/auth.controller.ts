import type { Request, Response } from "express"
import { getAuthMessage, loginUser, logoutUser, refreshAccessToken, registerUser } from "./auth.service.js";
import { loginSchema, refreshTokenSchema, registerSchema } from "./auth.schema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getAuth = (_req: Request, res: Response) => {
    const msg = getAuthMessage();
    res.send(msg);
}

export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    await registerUser(data);

    res.status(201).json({
        message: "User registered successfully",
    });
});

export const login= asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);

    const token=await loginUser(data);

    res.status(200).json({
        message: "User logged in successfully",
        ...token
    });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
});

export const refresh = asyncHandler(async (req:Request, res:Response) => {
    const data = refreshTokenSchema.parse(req.body);

    const token = await refreshAccessToken(data);

    res.status(200).json(token);
});

export const logout = asyncHandler(async (req: Request, res:Response) => {
    const data = refreshTokenSchema.parse(req.body);

    await logoutUser(data);

    res.status(200).json({
        message: "User logged out successfully"
    });
});