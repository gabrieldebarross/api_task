import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middleware/user.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

const userRoutes: Router = Router();

userRoutes.post("/", validate(createUserSchema), userController.createUser);

export default userRoutes;



