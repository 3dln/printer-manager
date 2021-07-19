// node.js
import fs from "fs";
import path from "path";
import express from "express";

// 3rd parties
import "reflect-metadata";
import ptp from "pdf-to-printer";
import morgan from "morgan";
import cors from "cors";
import html_to_pdf from "html-pdf-node";

// application
import trim from "./middlewares/trim";
import authRoutes from "./routes/auth";
import { printSavedFile } from "./helpers/printer";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(trim);
app.get("/getprinters", (_, res) => {
    ptp.getPrinters()
        .then((printers) => res.json({ printers }))
        .catch((err) => res.status(500).json({ err }));
});

app.post("/print", async (req, res) => {
    const printers = req.body.printers;
    const billUrl = req.body.printers[0].page;
    const orderId = req.body.orderId;
    const filePath = path.join(__dirname, "bills", `${orderId}.pdf`);

    html_to_pdf
        .generatePdf({ url: billUrl }, { format: "A4" })
        .then((pdfBuffer: Buffer) => {
            fs.writeFile(filePath, pdfBuffer, (err) => {
                if (err) {
                    return res.status(500).json({ success: false });
                }
                printSavedFile(printers, filePath)
                    .then(() => {
                        return res.json({ success: true });
                    })
                    .catch(() => {
                        return res.status(500).json({ success: false });
                    });
            });
        });
});

app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
    console.log(`Server started`);
    // try {
    //     await createConnection();
    //     console.log(`Database connected`);
    // } catch (err) {
    //     console.log(err);
    // }
});
