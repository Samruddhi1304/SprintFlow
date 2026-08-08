import { prisma } from "../../lib/prisma.js";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const findUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    return prisma.user.create({
        data,
    });
};

export const createRefreshToken = async (data: {
    token: string;
    userId: string;
    expiresAt: Date;
}) => {
    return prisma.refreshToken.create({
        data,
    });
};

export const findRefreshToken = async (token: string) => {
    return prisma.refreshToken.findFirst({
        where: {
            token,
        },
    });
};

export const deleteRefreshToken = async (id: string) => {
    return prisma.refreshToken.delete({
        where: {
            id,
        },
    });
};

export const rotateRefreshToken = async (
    oldTokenId: string,
    data: {
        token: string;
        userId: string;
        expiresAt: Date;
    }
) => {
    return prisma.$transaction([
        prisma.refreshToken.delete({
            where: {
                id: oldTokenId,
            },
        }),
        prisma.refreshToken.create({
            data,
        }),
    ]);
};