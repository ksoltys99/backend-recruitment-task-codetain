import { Request, Response } from "express";
import { CarData } from "./types";

const express = require("express");
const app = express();
const port = 7000;
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "qwerty!23",
  database: "codetain_cars_ks",
});

connection.connect();

app.get("/cars", (req: Request, res: Response) => {
  connection.query(
    `SELECT * FROM cars LEFT JOIN (SELECT a.vin, a.soc, a.charging_datetime FROM charging_data a INNER JOIN(SELECT vin, soc, MAX(charging_datetime) charging_datetime FROM charging_data GROUP BY vin) b ON
    a.vin = b.vin AND a.charging_datetime = b.charging_datetime) c ON cars.vin = c.vin`,
    function (error: Error, results: any) {
      if (error) throw error;
      res.status(200).send(createDataTemplate(results));
    }
  );
});

app.get("/cars/:vin", (req: Request, res: Response) => {
  const vin = req.params.vin;
  connection.query(
    `SELECT cars.made, cars.model, cars.year, cars.vin, charging_data.soc FROM cars, charging_data WHERE cars.vin='${vin}' AND charging_data.vin='${vin}' ORDER BY charging_datetime desc LIMIT 1`,
    function (error: Error, results: any) {
      if (error) {
        res.status(500);
        throw error;
      } else {
        res.status(200).send(createDataTemplate(results));
      }
    }
  );
});

const createDataTemplate = (data: CarData[]): string => {
  let template = ``;
  data.forEach((element: CarData) => {
    template += `<p> Model: ${element.model} </p>
    <p> Made: ${element.made} </p>
    <p> Year: ${element.year.getFullYear()} </p>
    <p> Vin: ${element.vin} </p>
    <p> Latest state of charging: ${element.soc} %</p>
    <hr>`;
  });

  return template;
};

app.listen(port);
