import { prisma } from "../../lib/prisma.js";
import type { RegisterInput } from "./auth.schema.js";

export const getAuthMessage=()=>{
    return "Auth Route";
}

export const registerUser= async(data:RegisterInput)=>{
    return await prisma.user.create({
        data
    })
}