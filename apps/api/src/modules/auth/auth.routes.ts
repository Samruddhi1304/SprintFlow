import { Router } from "express";
import { getAuth, login, logout, me, refresh, register } from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const authRouter: Router= Router();

authRouter.get('/', getAuth);

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get("/me", authMiddleware, me);

authRouter.post("/refresh", refresh);

authRouter.post("/logout", logout);

export default authRouter;