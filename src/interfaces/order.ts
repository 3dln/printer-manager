export enum OrderPrintStatus {
    READY = "ready",
    BUSY = "busy",
    FAILED = "failed"
}

export default interface IOrder {
    id: string;
    data: string;
    printerId: string;
    PrintStatus: OrderPrintStatus;
}