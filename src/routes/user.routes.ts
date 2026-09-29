import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middleware/user.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";
import checkAuth from "../middleware/checkAuth.js";

const userRoutes: Router = Router();

userRoutes.post("/", validate(createUserSchema), userController.createUser);
userRoutes.get("/:id", checkAuth,userController.getUserById);

export default userRoutes;



