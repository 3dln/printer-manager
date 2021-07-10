// node.js
import express, { Request, Response } from 'express';
// typeorm
import "reflect-metadata";
import { createConnection } from "typeorm";

// Application
import { User } from "./entities/User";

// Main application
const app = express();
app.use(express.json());

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

// listening to the port right after connection to the database created
createConnection()
    .then(async () => {
        // TODO: port and address should get read from environment variables
        app.listen(5000, () => console.log(`Server is running at http://localhost:5000`));

    }).catch(error => console.log(error));
