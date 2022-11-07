import { Request, Response } from "express";
import { createDataTemplate } from "./createDataTemplate";

const express = require("express");
const app = express();
const port = 6001;
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "qwerty!23",
  database: "codetain_cars_ks",
});

connection.connect();

app.get("/cars/avgcp", (req: Request, res: Response) => {
  connection.query(`SELECT * FROM cars_avg_cp`, (err: Error, results: any) => {
    if (err) console.log(err);
    res.status(200).send(createDataTemplate(results));
  });
});

app.get("/cars/avgcp/:vin", (req: Request, res: Response) => {
  const vin = req.params.vin;
  connection.query(
    `SELECT * FROM cars_avg_cp WHERE vin = '${vin}'`,
    (err: Error, results: any) => {
      if (err) console.log(err);
      res.status(200).send(createDataTemplate(results));
    }
  );
});

app.listen(port);
