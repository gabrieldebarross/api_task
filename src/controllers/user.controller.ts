import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "../services/user.service.js";
import AppError from "../errors/app.error.js";

class UserController {
    createUser = async(
        req: Request,
        res: Response
    ) => {
        try {
            const { name, email, password } = req.body;

            const user = await userService.createUser({
                name,
                email,
                password
            })

            return res.status(StatusCodes.CREATED).json({
                message: "Usuário criado com sucesso",
                user
            });
        } catch(error) {
            if(error instanceof AppError){
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            console.log("Erro ao criar o usuário", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno no servidor, tente novamente mais tarde."
            })
        }
    }
}

export default new UserController();