import html_to_pdf from "html-pdf-node";
import { printSavedFile } from "./printer";
import path from "path";
import IPrinter from "../interfaces/printer";
import IConvertResult from "../interfaces/convert";

export const ConvertAll = (
    printers: IPrinter[],
    totalItems: number,
    orderId: string
) => {
    const promises = printers.map((printer) => {
        return new Promise((resolve, reject) => {
            ConvertToPDF(printer.page, totalItems, orderId, printer.id).then(
                (resp: IConvertResult) => {
                    printSavedFile(printer.name, resp.filePath);
                    resolve(resp);
                }
            );
        });
    });

    Promise.all(promises).then((results) => {
        // console.log(results);
    });
};

export const ConvertToPDF = (
    billUrl: string,
    totalItems: number,
    orderId: string,
    printerId: string
) => {
    // Dynamic height for thermal printer
    let pdfHeight = 200;
    if (totalItems > 1) {
        pdfHeight += (totalItems - 1) * 15;
    }

    const filePath = path.join(
        __dirname,
        "..",
        "bills",
        `${orderId}-${printerId}.pdf`
    );

    return new Promise((resolve, reject) => {
        html_to_pdf
            .generatePdf(
                { url: billUrl },
                {
                    // format: "A5",
                    width: "148mm",
                    height: `${pdfHeight}mm`,
                    scale: 2,
                    // pageRanges: "1-1",
                    margin: {
                        top: "1cm",
                        bottom: "1cm",
                        left: "1cm",
                        right: "1cm",
                    },

                    path: filePath,
                }
            )
            .then(() => {
                resolve({ orderId, printerId, filePath });
                // return res.json({ success: false });
                // fs.writeFile(filePath, pdfBuffer, (err) => {
                //     if (err) {
                //         return res.status(500).json({ success: false });
                //     }
                // printSavedFile(printers, filePath)
                //     .then(() => {
                //         return res.json({ success: true });
                //     })
                //     .catch(() => {
                //         return res.status(500).json({ success: false });
                //     });
            });
    });
};
