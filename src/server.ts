// node.js
import express, { Request, Response } from "express";

// 3rd parties
import "reflect-metadata";
import { createConnection } from "typeorm";
import morgan from "morgan";

// application
import trim from "./middlewares/trim";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(trim);

app.get("/", (_, res) => {
    res.json("Hello there");
});
app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
    console.log(`Server started`);
    try {
        await createConnection();
        console.log(`Database connected`);
    } catch (err) {
        console.log(err);
    }
});
