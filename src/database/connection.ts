import { Sequelize } from "sequelize";
import { env } from "../config/env.js";

export const database = new Sequelize(
    env.database.name,
    env.database.user,
    env.database.password,
    {
        host: env.database.host,
        port: env.database.port,
        dialect: "mysql",

        logging: false,

        define: {
            timestamps: true,
            underscored: true
        }
    }
);

export async function connectionDb(): Promise<void>{
    try {
        await database.authenticate();
        console.log("Banco de dados conectado");
    } catch (error){
        console.error("Erro ao conectar no banco de dados", error);
        process.exit(1);
    }
}