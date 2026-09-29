import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import verifyToken from "../utils/verifyToken.js";

export default async function(
    req: Request,
    res: Response,
    next: NextFunction
){
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Acesso negado. Token não fornecido"
        });
    }

    try {
        const decoded = await verifyToken(token);

        req.user = decoded;
        next();
    } catch(error){
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "Acesso negado, token não informado, inválido ou expirado."
        })
    }
}