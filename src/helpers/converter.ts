import html_to_pdf from "html-pdf-node";
import { printSavedFile } from "./printer";
import path from "path";
import IPrinter from "../interfaces/printer";
import IConvertResult from "../interfaces/convert";
import {
    getPrintHeight,
    getPrintScale,
    getPrintWidth,
} from "../utils/bxllabel";

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

    return Promise.all(promises)
        .then((results: IConvertResult[]) => {
            // console.log(results);
            return results;
        })
        .catch((err) => {
            return null;
        });
};

export const ConvertToPDF = (
    billUrl: string,
    totalItems: number,
    orderId: string,
    printerId: string
) => {
    console.log(billUrl);
    // Dynamic height for thermal printer
    let pdfHeight = 200;
    if (totalItems > 1) {
        pdfHeight += (totalItems - 1) * 18;
    }
    const filePath = path.join(
        __dirname,
        "..",
        "bills",
        `${orderId}-${printerId}.pdf`
    );

    return new Promise((resolve, _) => {
        html_to_pdf
            .generatePdf(
                { url: billUrl },
                {
                    width: getPrintWidth(),
                    height: getPrintHeight(),
                    scale: getPrintScale(),
                    margin: {
                        top: "0cm",
                        left: "1cm",
                        right: "1cm",
                    },

                    path: filePath,
                }
            )
            .then(() => {
                resolve({ orderId, printerId, filePath });
            });
    });
};
