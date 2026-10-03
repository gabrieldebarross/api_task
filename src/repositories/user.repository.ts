import UserModel from "../models/user.model.js";

class UserRepository {
    create = async (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        return UserModel.create(data);
    }

    findByEmail = async (email: string) => {
        return UserModel.findOne({
            where: { email }
        });
    }

    findById = async (id: number) => {
        return UserModel.findByPk(id, {
            attributes: {
                exclude: ["password"]
            }
        })
    }

    findAll = async (where = {}) => {
        return UserModel.findAll({
            where,
            attributes: {
                exclude: ["password"]
            }
        })
    }

    softDelete = async (id: number) => {
        const [affectedCount] = await UserModel.update(
            {
                isActive: false
            },
            {
                where: {
                    id: id,
                    isActive: true
                }
            }
        );
        return affectedCount;
    }
}

export default new UserRepository;