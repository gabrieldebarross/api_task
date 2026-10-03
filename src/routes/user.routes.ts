import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middleware/user.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";
import checkAuth from "../middleware/check.auth.js";

const userRoutes: Router = Router();

userRoutes.post("/", validate(createUserSchema), userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/", checkAuth, userController.findUsers);
userRoutes.get("/:id", checkAuth, userController.getUserById);
userRoutes.delete("/", checkAuth, userController.softDeleteUser);

export default userRoutes;



