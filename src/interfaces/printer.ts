export enum PrinterStatus {
    INACTIVE = "inactive",
    READY = "ready",
    BUSY = "busy"
}

export default interface IPrinter {
    id: string;
    name: string;
    ip: string;
    status: PrinterStatus;
}