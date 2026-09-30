import bcrypt from "bcrypt";

export default async function comparePassword(password: string, hashedPassword: string){
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error("Erro ao comparar as senhas")
    }
}