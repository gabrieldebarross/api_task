import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { database } from "../database/connection.js";

class UserModel extends Model <
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
    >{
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;

    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "is_active"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at"
        }
    },
    {
        sequelize: database,
        tableName: "users",
        modelName: "UserModel",
        timestamps: true,
        underscored: true
    }
)

export default UserModel;