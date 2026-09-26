import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { StatusCodes } from "http-status-codes";

export default function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const verifyInputs = schema.safeParse(req.body);

        if (!verifyInputs.success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Verifique seus dados e tente novamente.",
                error: verifyInputs.error.issues
            });
        }

        req.body = verifyInputs.data;
        next();
    }
}