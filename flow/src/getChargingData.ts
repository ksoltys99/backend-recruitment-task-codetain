const https = require("https");
import { Response } from "express";

export const getChargingData = async (
  vin: string,
  apiURL: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    https.get(apiURL + "/" + vin, (res: Response) => {
      const chunks: any[] = [];
      res.on("data", async (chunk: any) => {
        chunks.push(chunk);
      });
      res.on("end", () => {
        let data = Buffer.concat(chunks).toString();
        if (data.length > 0) {
          resolve(data);
        } else {
          reject("failed to fetch data");
        }
      });
    });
  });
};
