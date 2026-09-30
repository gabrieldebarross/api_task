import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";

interface userPayload extends JwtPayload {
    id: number;
    name: string;
    email: string
}

export default async function verifyToken(token: string): Promise<userPayload>{
    const jwtSecret = env.jwtSecret;
    try {
        const decoded = jwt.verify(token, jwtSecret) as userPayload
        return decoded;
    } catch(error){
        throw new Error("Erro ao verificar os tokens.")
    }
}