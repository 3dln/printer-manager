import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserRole } from './interfaces/user';

createConnection().then(async connection => {

    // Predefined data
    console.log("Inserting a new user into the database...");
    const user = new User();

    user.name = "کیارش مظفری";
    user.mobile = "09123456789";
    user.role = UserRole.ADMIN;

    await user.save();

    console.log("Saved a new user with id: " + user.id);

}).catch(error => console.log(error));
