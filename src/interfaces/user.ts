export enum UserRole {
    CLIENT = "client",
    VIP = "vip",
    CASHIER = "cashier",
    ACCOUNTANT = "accountant",
    ADMIN = "admin",
    SUPER = "super"
}

export default interface IUser {
    id?: string;
    username?: string;
    password?: string;
    name: string;
    email?: string;
    mobile: string;
    image?: string;
    streetAddress?: string;
    apartmentNumber?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    role?: UserRole;
    walletDeposit?: number;
}