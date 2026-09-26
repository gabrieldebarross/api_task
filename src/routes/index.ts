import userRoutes from "./user.routes.js";
import { Router } from "express";


const routes: Router = Router();

routes.use("/user", userRoutes);

export default routes;