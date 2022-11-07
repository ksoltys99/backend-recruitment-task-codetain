require("dotenv").config();
import { Request, Response } from "express";
import { Car, ChargingCarStatistics, ChargingData } from "./types";
import { getChargingData } from "./getChargingData";
import { calculateAvgChargingPower } from "./calculateAvgChargingPower";

const express = require("express");
const app = express();
const port = 8000;
const https = require("https");
const mysql = require("mysql");
const apiURL = "https://www.mockachino.com/63df88f9-7c68-4e/evs";

const connection = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "qwerty!23",
  database: "codetain_cars_ks",
});

connection.connect();

app.get("/getalldata", async (request: Request, response: Response) => {
  await createTables();

  https.get(apiURL, (res: Response) => {
    let data: any[] = [];
    res.on("data", (chunck) => {
      data.push(chunck);
    });

    res.on("end", async () => {
      const bufferedData = await JSON.parse(Buffer.concat(data).toString());
      const cars: Car[] = bufferedData.cars;

      cars.forEach(async (car: Car) => {
        connection.query(
          `INSERT INTO cars (made, model, year, vin) VALUES ('${car.made}', '${car.model}', '${car.year}', '${car.vin}')`,
          function (error: Error, results: any) {
            if (error) throw error;
            console.log(results);
          }
        );

        await getChargingData(car.vin, apiURL)
          .then((data: any) => {
            const carData: ChargingData = JSON.parse(data);
            const { vin } = carData;
            carData.carStatistics.forEach((state: ChargingCarStatistics) => {
              const { soc, chargingPower, status } = state;
              const datetime = state.datetime.replace("T", " ");
              connection.query(
                `INSERT INTO charging_data (vin, charging_datetime, soc, charging_power, charging_status) VALUES ('${vin}', '${datetime}', '${soc}', '${chargingPower}', '${status}')`,
                function (error: Error, results: any) {
                  if (error) {
                    throw error;
                  }
                  console.log(results);
                }
              );
            });

            const avgCarCp = calculateAvgChargingPower(carData);
            connection.query(
              `INSERT INTO cars_avg_cp (vin, avg_cp) VALUES ('${avgCarCp.vin}', '${avgCarCp.avgChargingPower}')`,
              (error: Error, results: any) => {
                if (error) throw error;
                console.log(results);
              }
            );
          })
          .catch((err: Error) => {
            console.log(err);
            return response.status(500).send("Could not add data to database");
          });
      });
    });
    return response.status(200).send("Data added to database succesfully");
  });
});

export const createTables = async () => {
  connection.query(
    `CREATE TABLE if not exists cars (
    carId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    made varchar(255),
    model varchar(255),
    year date,
    vin varchar(255) UNIQUE KEY)`,
    (error: Error, results: any) => {
      if (error) throw error;
      console.log(results);
    }
  );
  connection.query(
    `CREATE TABLE if not exists charging_data (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vin varchar(255),
    charging_datetime datetime,
    soc varchar(255),
    charging_power int,
    charging_status varchar(255))`,
    (error: Error, results: any) => {
      if (error) throw error;
      console.log(results);
    }
  );
  connection.query(
    `CREATE TABLE if not exists cars_avg_cp (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vin varchar(255) UNIQUE KEY,
    avg_cp int)`,
    (error: Error, results: any) => {
      if (error) throw error;
      console.log(results);
    }
  );
};

app.listen(port);
