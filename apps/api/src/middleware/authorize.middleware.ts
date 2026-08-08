import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/client.js";
import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { hasPermission } from "../modules/rbac/permission.service.js";

export const authorize = (
    resource: string,
    action: string
) => {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const role = req.user?.role as Role | undefined;

        if (!role) {
            return next(
                new AppError(
                    "Authentication required",
                    HTTP_STATUS.UNAUTHORIZED
                )
            );
        }

        if (!hasPermission(role, resource, action)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    HTTP_STATUS.FORBIDDEN
                )
            );
        }

        next();
    };
};