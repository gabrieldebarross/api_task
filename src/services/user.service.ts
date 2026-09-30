import type { WhereOptions } from "sequelize";
import AppError from "../errors/app.error.js";
import UserModel from "../models/user.model.js";
import hashedPassword from "../utils/hashed.password.js";
import bcrypt from "bcrypt";
import comparePassword from "../utils/compare.password.js";
import generateToken from "../utils/generateToken.js";

interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

interface IFindUsersFilters  {
    name?: string,
    email?: string
}

interface IUserAttributes {
    id: number,
    name: string,
    email: string
}

interface ILoginUser {
    email: string,
    password: string
}

class UserService {
    createUser = async ({ name, email, password }: ICreateUser) => {
        const userExist = await UserModel.findOne({
            where: { email }
        });

        if (userExist) {
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

    loginUser = async({email, password}: ILoginUser) => {
        const userExists = await UserModel.findOne({
            where: { email }
        });

         if(!userExists){
            throw new AppError(
                "Verifique as informações fornecidas e tente novamente.",
                401
            )
        }

        const verifyPassword = await comparePassword(password, userExists.password);
        
        if(!verifyPassword){
            throw new AppError(
                "Verifque as informações fornecidas e tente novamente.",
                401
            )
        }

        const payload = {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email
        }

        const token = generateToken(payload);

        return token;
    }

    getUserById = async (id: number) => {
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(
                "Não foi possível encontrar o usuário. Verifique o ID informado.",
                400
            );
        }

        const user = await UserModel.findByPk(id);

        if (!user) {
            throw new AppError(
                "Não foi possível encontrar o usuário. Tente novamente.",
                404
            );
        }

        const { password: _, ...userWithoutPassword } = user.toJSON();

        return userWithoutPassword;
    }

    findUsers  = async ({name, email}:IFindUsersFilters ) => {
        try {
            const where: WhereOptions<IUserAttributes> = {};

            if(name !== undefined){
                where.name = name;
            }
            if(email !== undefined){
                where.email = email;
            }
    
            const users = await UserModel.findAll({
                where
            });

            return users;
        } catch(error){
            throw new AppError(
                "Não foi possível realizar a busca de usuários.",
                500
            );
        }
    }
}

export default new UserService();