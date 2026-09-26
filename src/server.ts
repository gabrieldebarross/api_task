import app from "./app.js";
import { env } from "./config/env.js"
import { connectionDb } from "./database/connection.js";


async function startServer(): Promise<void> {
    try {
        await connectionDb();
        app.listen(env.port, ()=> {
            console.log(`Servidor rodando na porta: ${env.port}`);
        });
    } catch(error){
        console.error("Erro ao iniciar o servidor", error);
        process.exit(1)
    }
}

startServer();