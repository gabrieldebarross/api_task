import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app.error.js";
import UserModel from "../models/user.model.js";
import hashedPassword from "../utils/hashed.password.js";

interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

class UserService {
    createUser = async({ name, email, password}: ICreateUser) => {
        const userExist = await UserModel.findOne({
            where: { email }
        });

        if(userExist){
            throw new AppError(
                "Não foi possível realizar o seu cadastro. Tente novamente.",
                409
            );
        }

        const passwordHashed = await hashedPassword(password);

        const user = await UserModel.create({
            name,
            email,
            password: passwordHashed
        });

        const { password: _, ...userWithoutPassword } = user.toJSON();

        return userWithoutPassword;
    }

    getUserById = async(id: number) => {
        if(!Number.isInteger(id) || id <=0){
            throw new AppError(
                "Não foi possível encontrar o usuário. Verifique o ID informado.",
                400
            );
        }

        const user = await UserModel.findByPk(id);

        if(!user){
           throw new AppError(
            "Não foi possível encontrar o usuário. Tente novamente.",
            404
           );
        }

        const { password: _, ...userWithoutPassword } = user.toJSON();

        return userWithoutPassword;
    }
}

export default new UserService();