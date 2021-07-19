import { NextFunction, Request, Response } from "express";
import * as html_to_pdf from "html-pdf-node";
import fs from "fs";
import path from "path";

export default (req: Request, res: Response, next: NextFunction) => {
    const htmlBill = req.body.billUrl;
    const orderId = req.body.orderId;
    const filePath = path.join(__dirname, "bills", `${orderId}.pdf`);

    html_to_pdf
        .generatePdf({ url: htmlBill }, { format: "A4" })
        .then((pdfBuffer) => {
            fs.writeFileSync(filePath, pdfBuffer);
            // console.log(pdfBuffer);
        })
        .catch((err) => {
            console.log(err);
        });

    next();
};
