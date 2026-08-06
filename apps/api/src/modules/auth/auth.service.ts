import { prisma } from "../../lib/prisma.js";
import { getRefreshTokenExpiry } from "../../utils/date.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import type { LoginInput, RefreshTokenInput, RegisterInput } from "./auth.schema.js";
import * as bcrypt from "bcrypt";

export const getAuthMessage = () => {
    return "Auth Route";
}

export const registerUser = async (data: RegisterInput) => {
    const emailExist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (emailExist) {
        throw new Error("Email already registered!");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
        data: {
            ...data, password: hashedPassword
        }
    })
}

export const loginUser = async (data: LoginInput) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid Email or Password");
    }

    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user.id,
    });

    const expiresAt = getRefreshTokenExpiry();

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt,
        },
    });

    return {
        accessToken,
        refreshToken,
    };
}

export const refreshAccessToken = async (
    data: RefreshTokenInput
) => {
    const decoded = verifyRefreshToken(data.refreshToken);

    const storedToken = await prisma.refreshToken.findFirst({
        where: {
            token: data.refreshToken,
        },
    });

    if (!storedToken) {
        throw new Error("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const newRefreshToken = generateRefreshToken({
        id: user.id,
    });

    const expiresAt = getRefreshTokenExpiry();

    await prisma.$transaction([
        prisma.refreshToken.delete({
            where: {
                id: storedToken.id,
            },
        }),
        prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: user.id,
                expiresAt,
            },
        }),
    ]);

    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};

export const logoutUser = async (
    data: RefreshTokenInput
) => {
    verifyRefreshToken(data.refreshToken);

    const storedToken = await prisma.refreshToken.findFirst({
        where: {
            token: data.refreshToken,
        },
    });

    if (!storedToken) {
        throw new Error("Invalid refresh token");
    }

    await prisma.refreshToken.delete({
        where: {
            id: storedToken.id,
        },
    });
};