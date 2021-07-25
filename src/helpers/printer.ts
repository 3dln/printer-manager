import ptp from "pdf-to-printer";
import IPrinter from "../interfaces/printer";
export const printSavedFile = (printer: string, filePath: string) => {
    return new Promise((resolve, reject) => {
        const options = {
            pritner: printer,
            unix: [],
            win32: ['-print-settings "noscale"'],
        };
        ptp.print(filePath, options)
            .then((resp) => resolve(resp))
            .catch((err) => reject(err));
    });
};
