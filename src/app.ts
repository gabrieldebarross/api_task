import express from "express";
import { StatusCodes } from "http-status-codes";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/api", (req, res) => {
    res.status(StatusCodes.OK).json({
        Message: "Servidor funcionando :)"
    })
})
app.use("/api", routes);

export default app;
