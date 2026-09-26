import bcrypt from "bcrypt"

const saltRounds = 12;

export default async function hashedPassword(password: string): Promise<string>{
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch(error) {
        throw new Error("Erro ao gerar o hash da senha")
    }
}