import ptp from "pdf-to-printer";

export const printSavedFile = (printer: string, filePath: string) => {
    console.log("printing to", printer);
    return new Promise((resolve, reject) => {
        const options = {
            pritner: printer,
            unix: ["-o fit-to-page"],
            win32: ['-print-settings "noscale"'],
        };
        ptp.print(filePath, options)
            .then((resp) => resolve(resp))
            .catch((err) => reject(err));
    });
};
