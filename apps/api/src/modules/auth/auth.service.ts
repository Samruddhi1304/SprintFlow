import { prisma } from "../../lib/prisma.js";
import type { RegisterInput } from "./auth.schema.js";
import * as bcrypt from "bcrypt";

export const getAuthMessage=()=>{
    return "Auth Route";
}

export const registerUser= async(data:RegisterInput)=>{
    const emailExist= await prisma.user.findUnique({
        where:{
            email: data.email
        }
    });
    if(emailExist){
        throw new Error("Email already registered!");
    }
    const hashedPassword= await bcrypt.hash(data.password, 10);
    return await prisma.user.create({data:{
        ...data, password: hashedPassword
    }})
}