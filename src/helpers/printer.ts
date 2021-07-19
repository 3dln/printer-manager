import ptp from "pdf-to-printer";
import IPrinter from "../interfaces/printer";
export const printSavedFile = (printers: IPrinter[], _path: string) => {
    return new Promise((resolve, _) => {
        let errors = [];
        let result = [];
        printers.forEach((printer) => {
            const options = {
                pritner: printer.name,
                unix: ["-o fit-to-page"],
                win32: ['-print-settings "fit"'],
            };
            ptp.print(_path, options)
                .then((resp) => result.push(resp))
                .catch((err) => errors.push(err))
                .finally(() => resolve([errors, result]));
        });
    });
};
