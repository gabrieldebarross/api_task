import { env } from "../config/env.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = env.jwtSecret;
const JWT_EXPIRES_IN = "1d";

interface IUserPayload {
    id: number,
    name: string,
    email: string
}

export default function generateToken(user: IUserPayload){
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    return jwt.sign(payload, String(JWT_SECRET), {
        expiresIn: JWT_EXPIRES_IN
    })
}