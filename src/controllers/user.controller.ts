import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "../services/user.service.js";
import AppError from "../errors/app.error.js";

class UserController {
    createUser = async (
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
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno no servidor, tente novamente mais tarde."
            })
        }
    }

    loginUser = async (
        req: Request,
        res: Response
    ) => {
        try {
            const { email, password } = req.body;

            const userInfos = {
                email: email,
                password: password
            }

            const userToken = await userService.loginUser(userInfos);
            
            return res.status(StatusCodes.OK).json({
                message: "Usuário logado com sucesso!",
                token: userToken
            });
        } catch(error){
            if(error instanceof AppError){
                return res.status(error.statusCode).json({
                    message: error.message
                })
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno no servidor, tente novamente mais tarde."
            })
        }
    }

    getUserById = async (
        req: Request,
        res: Response
    ) => {
        try {
            const id = Number(req.params.id);

            const user = await userService.getUserById(id);

            return res.status(StatusCodes.OK).json({
                message: "Usuário encontrado com sucesso",
                user: user
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno no servidor, tente novamente mais tarde."
            })
        }
    }

    findUsers = async (
        req: Request,
        res: Response
    ) => {
        try {
            const { name, email } = req.query;

            const user = {
                ...(typeof name === "string" && { name }),
                ...(typeof email === "string" && { email })
            }

            const users = await userService.findUsers(user);
            if (users.length === 0) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Nenhum usuário encontrado."
                })
            } else if (users.length === 1) {
                res.status(StatusCodes.OK).json({
                    message: "Usuário encontrado com sucesso!",
                    users
                })
            } else {
                res.status(StatusCodes.OK).json({
                    message: "Usuários retornados com sucesso!",
                    users
                })
            }
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    message: error.message
                })
            }
        }
    }
}

export default new UserController();