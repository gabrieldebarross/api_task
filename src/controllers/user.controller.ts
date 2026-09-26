import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user.model.js";
import hashedPassword from "../utils/hashed.password.js";

class UserController {
    createUser = async(
        req: Request,
        res: Response
    ) => {
        try {
            const { name, email, password } = req.body;

            const userExists = await UserModel.findOne({
                where: { email }
            });

            if(userExists){
                res.status(StatusCodes.CONFLICT).json({
                    message: "Não foi possível realizar o seu cadastro. Verifique suas informações e tente novamente."
                })
                return;
            }

            const passwordHashed = await hashedPassword(password);

            const user = await UserModel.create({
                name,
                email,
                password: passwordHashed
            })

            const {password: _, ...userWithOutPassword } = user.toJSON();

            return res.status(StatusCodes.CREATED).json({
                message: "Usuário criado com sucesso",
                user: userWithOutPassword
            });
        } catch(error) {
            console.log("Erro ao criar o usuário", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno no servidor, tente novamente mais tarde."
            })
        }
    }
}

export default new UserController();