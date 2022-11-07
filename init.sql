CREATE DATABASE IF NOT EXISTS codetain_cars_ks;
USE codetain_cars_ks;
CREATE TABLE if not exists cars (
    carId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    made varchar(255),
    model varchar(255),
    year date,
    vin varchar(255) UNIQUE KEY);

CREATE TABLE if not exists charging_data (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vin varchar(255),
    charging_datetime datetime,
    soc varchar(255),
    charging_power int,
    charging_status varchar(255));

CREATE TABLE if not exists cars_avg_cp (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vin varchar(255) UNIQUE KEY,
    avg_cp int);