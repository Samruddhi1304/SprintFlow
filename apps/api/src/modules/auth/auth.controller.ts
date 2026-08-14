import type { Request, Response } from "express"
import { getAuthMessage, loginUser, logoutUser, refreshAccessToken, registerUser } from "./auth.service.js";
import { loginSchema, refreshTokenSchema, registerSchema } from "./auth.schema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { SUCCESS_MESSAGES } from "../../constants/successMessages.js";

export const getAuth = (_req: Request, res: Response) => {
    const msg = getAuthMessage();
    res.send(msg);
}

export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    await registerUser(data);

    res.status(HTTP_STATUS.CREATED).json({
        message: SUCCESS_MESSAGES.USER_REGISTERED
    });

    return;
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);

    const { accessToken, refreshToken } = await loginUser(data);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.USER_LOGGED_IN,
        accessToken,
    });

    return;
});

export const me = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        user: req.user,
    });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const data = refreshTokenSchema.parse(req.body);

    const token = await refreshAccessToken(data);

    res.status(HTTP_STATUS.OK).json(token);
    return;
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const data = refreshTokenSchema.parse(req.body);

    await logoutUser(data);

    res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.USER_LOGGED_OUT
    });

    return;
});