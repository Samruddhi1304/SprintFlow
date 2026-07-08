import { Router } from "express";
import { getAuth, register } from "./auth.controller.js";

const authRouter: Router= Router();

authRouter.get('/', getAuth);

authRouter.post('/register', register);

export default authRouter;