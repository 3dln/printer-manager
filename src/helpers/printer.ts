import ptp from "pdf-to-printer";

export const printSavedFile = (printer: string, filePath: string) => {
    return new Promise((resolve, reject) => {
        const options = {
            pritner: printer,
            unix: ["-o fit-to-page"],
            win32: ['-print-settings "fit,simplex"'],
        };
        ptp.print(filePath, options)
            .then((resp) => resolve(resp))
            .catch((err) => reject(err));
    });
};
