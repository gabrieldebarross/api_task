import express from "express";
import { StatusCodes } from "http-status-codes";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.get("/api", (req, res) => {
    res.status(StatusCodes.OK).json({
        Message: "Servidor funcionando :)"
    })
})
app.use("/api", routes);

export default app;
