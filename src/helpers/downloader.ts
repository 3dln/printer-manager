import http from "http";
import fs from "fs";
import { printSavedFile } from "./printer";
import IPrinter from "../interfaces/printer";

export const getFile = (url: string) => {
    return new Promise((resolve, reject) => {
        let client = http;

        client
            .get(url, (resp) => {
                let data = "";

                // A chunk of data has been recieved.
                resp.on("data", (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on("end", () => {
                    resolve(data);
                });
            })
            .on("error", (err) => {
                reject(err);
            });
    });
};

export const saveFile = (url: string, _path: string, printers: IPrinter[]) => {
    return new Promise((resolve, _) => {
        const file = fs.createWriteStream(_path);
        http.get(url, function (response) {
            response.pipe(file);
            printSavedFile(printers, _path).then((resp) => {
                resolve(resp);
            });
        });
    });
};

// return new Promise((resolve, reject) => {
//     request.get(url, function (error, response, body) {
//         if (error) {
//             return reject(error);
//         }
//         if (response.statusCode == 200) {
//             body.pipe(file);
//             return resolve(file.path);
//             // Continue with your processing here.
//         } else {
//             reject("Unknown error");
//         }
//     });
// });
