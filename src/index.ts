import express, { Request, Response } from 'express';
import "reflect-metadata";
import { createConnection } from "typeorm";

import { User } from "./entity/User";
import { UserRole } from './interfaces/user';

// Main application
const app = express();
app.use(express.json());

// Create
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
// Update
// Delete
// Find

createConnection()
    .then(async () => {
        app.listen(5000, () => console.log(`Server is running at http://localhost:5000`));

    }).catch(error => console.log(error));
