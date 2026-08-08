import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    if (err instanceof ZodError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: ERROR_MESSAGES.VALIDATION_FAILED,
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return res.status(HTTP_STATUS.CONFLICT).json({
                    message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
                });

            case "P2025":
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: ERROR_MESSAGES.USER_NOT_FOUND,
                });

            default:
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                });
        }
    }

    console.error(err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    });
}