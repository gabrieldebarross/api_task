import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigátorio")
        .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z
        .email("E-mail inválido"),
    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .max(100, "A senha deve ter no máximo 100 caracteres"),
}).strict();

export type CreateUserDTO = z.infer<typeof createUserSchema>;
