import http from "http";
import request from "request";
import fs from "fs";
import path from "path";
import ptp from "pdf-to-printer";

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

export const saveFile = (url: string, _path: string, printer: string) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(_path);
        http.get(url, function (response) {
            response.pipe(file);

            const options = {
                printer,
                unix: ["-o fit-to-page"],
                win32: ['-print-settings "fit"'],
            };
            ptp.print(_path, options)
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
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
