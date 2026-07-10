import type { NextFunction, Request, Response } from "express"
import { getAuthMessage, registerUser } from "./auth.service.js";
import { registerSchema } from "./auth.schema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getAuth = (req: Request, res: Response) => {
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