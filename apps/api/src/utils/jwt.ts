import jwt from "jsonwebtoken";
import type { JwtPayload, RefreshTokenPayload } from "../types/auth.types.js";
import { AppError } from "../errors/AppError.js";
import { AUTH } from "../constants/auth.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const generateAccessToken = (user: JwtPayload) => {

    return jwt.sign(
        user,
        process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn: AUTH.ACCESS_TOKEN_EXPIRY,
        }
    )
}

export const generateRefreshToken = (user: RefreshTokenPayload) => {

    return jwt.sign(
        user,
        process.env.JWT_REFRESH_SECRET!,
        {
            expiresIn: AUTH.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const verifyAccessToken = (
    token: string
) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as JwtPayload;
    } catch {
        throw new AppError(
            ERROR_MESSAGES.INVALID_ACCESS_TOKEN,
            HTTP_STATUS.UNAUTHORIZED
        );
    }
};


export const verifyRefreshToken = (
    token: string
): RefreshTokenPayload => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET!
        ) as RefreshTokenPayload;
    } catch {
        throw new AppError(
            ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
            HTTP_STATUS.UNAUTHORIZED
        );
    }
};