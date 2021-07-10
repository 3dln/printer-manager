import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import IUser, { UserRole } from '../interfaces/user';

@Entity('users')
export class User extends BaseEntity implements IUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, nullable: true, type: 'varchar', length: 64 })
    username: string;

    @Column({ unique: true, nullable: true, length: 256 })
    email: string;

    @Column({ nullable: true, length: 64 })
    password: string;

    @Column({ type: "varchar", length: 128 })
    name: string;

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
        default: UserRole.CLIENT
    })
    role: UserRole;

    @Column({ default: 0 })
    walletDeposit: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    toJSON() {
        return {
            ...this,
            username: undefined,
            email: undefined,
            password: undefined,
            streetAddress: undefined,
            apartmentNumber: undefined,
            city: undefined,
            zipCode: undefined,
            state: undefined,
            walletDeposit: undefined
        };
    }
}
