// node.js
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

// Constants
const PORT = 5000;
const HOST = "0.0.0.0";
const app = express();

app.use(express.json());
var corsOptions = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false,
};

app.use(cors(corsOptions));

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
        .generatePdf(
            { url: billUrl },
            {
                format: "A5",
                scale: 2,
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
            // return res.json({ success: true });
            // fs.writeFile(filePath, pdfBuffer, (err) => {
            //     if (err) {
            //         return res.status(500).json({ success: false });
            //     }
            printSavedFile(printers, filePath)
                .then(() => {
                    return res.json({ success: true });
                })
                .catch(() => {
                    return res.status(500).json({ success: false });
                });
        });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, HOST, async () => {
    console.log(`Server started at ${HOST} on port ${PORT}`);
});
// app.listen(5000, async () => {
//     console.log(`Server started`);
// try {
//     await createConnection();
//     console.log(`Database connected`);
// } catch (err) {
//     console.log(err);
// }
// });
