import jwt from "jsonwebtoken";
import type { JwtPayload, RefreshTokenPayload } from "../types/auth.types.js";

export const generateAccessToken = (user: JwtPayload) => {

    return jwt.sign(
        user,
        process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn: "15m",
        }
    )
}

export const generateRefreshToken = (user: RefreshTokenPayload) => {

    return jwt.sign(
        user,
        process.env.JWT_REFRESH_SECRET!,
        {
            expiresIn: "7d",
        }
    )
}

export const verifyAccessToken = (
  token: string
) => {
    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET!
    ) as JwtPayload;
};

export const verifyRefreshToken=(
    token:string
):RefreshTokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as RefreshTokenPayload;
};