import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return  next(
            new AppError(
                ERROR_MESSAGES.INVALID_ACCESS_TOKEN,
                HTTP_STATUS.UNAUTHORIZED
            )
        );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token!);

    req.user= decoded;

    next();
  } catch (error) {
    next(error);
  }
};