import { Entity as TOEntity, Column, Index } from "typeorm";
import { IsEmail, IsPhoneNumber, Length } from "class-validator";
import { Exclude } from "class-transformer";

import IUser, { UserRole } from "../interfaces/user";
import Entity from "./Entity";

@TOEntity("users")
export class User extends Entity implements IUser {
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    @Column({ unique: true, nullable: true, type: "varchar", length: 64 })
    username: string;

    @IsEmail()
    @Column({ unique: true, nullable: true, length: 256 })
    email: string;

    @Exclude()
    @Column({ nullable: true, length: 64 })
    password: string;

    @Length(3, 256, { message: "Name must be at least 3 characters long" })
    @Index()
    @Column({ type: "varchar", length: 128 })
    name: string;

    @Index()
    @IsPhoneNumber("IR")
    @Column({ unique: true })
    mobile: string;

    @Column({ default: "users/default.png" })
    image: string;

    @Column({ nullable: true, type: "varchar", length: 128 })
    streetAddress: string;

    @Column({ nullable: true, type: "varchar", length: 20 })
    apartmentNumber: string;

    @Column({ nullable: true, type: "varchar", length: 50 })
    city: string;

    @Column({ nullable: true, type: "varchar", length: 50 })
    state: string;

    @Column({ nullable: true, type: "varchar", length: 10 })
    zipCode: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole;

    @Column({ default: 0 })
    walletDeposit: number;
}
