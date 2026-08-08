import { AUTH } from "../constants/auth.js";

export const getRefreshTokenExpiry = () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + AUTH.REFRESH_TOKEN_EXPIRY_DAYS);
    return expiresAt;
};