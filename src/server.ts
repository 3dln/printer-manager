// node.js
import express, { Request, Response } from 'express';

// 3rd parties
import "reflect-metadata";
import { createConnection } from "typeorm";
import morgan from 'morgan';

// Application
import { User } from "./entities/User";

// Main application
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
    res.json('Hello there');
});

// Create
// TODO: this have to get moved to it's separate route handler file
app.post('/users', async (req: Request, res: Response) => {
    const { name, mobile } = req.body;
    try {
        const user = User.create({ name, mobile });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
// Read
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
// Update
// Delete
// Find

app.listen(5000, async () => {
    console.log(`Server started`);
    try {
        await createConnection();
        console.log(`Database connected`);
    } catch (err) {
        console.log(err);
    }
});
