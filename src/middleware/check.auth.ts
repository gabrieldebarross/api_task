import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import verifyToken from "../utils/verify.token.js";
import userRepository from "../repositories/user.repository.js";

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
        const isActive = await userRepository.isUserActive(decoded.id);
    
        if(!isActive){
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "Sua conta não foi encontrada ou se encontra desativada."
            })
        }
        
        req.user = decoded;
        next();
    } catch(error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Acesso negado, token não informado, inválido ou expirado."
        })
    }
}