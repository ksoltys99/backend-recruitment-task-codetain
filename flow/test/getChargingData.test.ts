import { getChargingData } from "../src/getChargingData";

test("should fetch data from api", () => {
  const input = ["PL090201", "https://www.mockachino.com/63df88f9-7c68-4e/evs"];

  const output = {
    vin: "PL090201",
    carStatistics: [
      {
        datetime: "2020-03-10T11:00:00",
        soc: "0",
        chargingPower: 0,
        status: "waiting",
      },
      {
        datetime: "2020-03-10T11:15:00",
        soc: "5",
        chargingPower: 100,
        status: "charging",
      },
      {
        datetime: "2020-03-10T11:30:00",
        soc: "8",
        chargingPower: 120,
        status: "charging",
      },
      {
        datetime: "2020-03-10T11:45:00",
        soc: "15",
        chargingPower: 130,
        status: "charging",
      },
      {
        datetime: "2020-03-10T12:00:00",
        soc: "20",
        chargingPower: 150,
        status: "charging",
      },
      {
        datetime: "2020-03-10T12:15:00",
        soc: "25",
        chargingPower: 0,
        status: "waiting",
      },
    ],
  };

  getChargingData(input[0], input[1]).then((data: any) =>
    expect(JSON.parse(data)).toStrictEqual(output)
  );
});

test("should fail to fetch data from api", async () => {
  const input = ["0000000", "https://www.mockachino.com/63df88f9-7c68-4e/evs"];
  const output = {
    vin: "PL090201",
    carStatistics: [
      {
        datetime: "2020-03-10T11:00:00",
        soc: "0",
        chargingPower: 0,
        status: "waiting",
      },
      {
        datetime: "2020-03-10T11:15:00",
        soc: "5",
        chargingPower: 100,
        status: "charging",
      },
      {
        datetime: "2020-03-10T11:30:00",
        soc: "8",
        chargingPower: 120,
        status: "charging",
      },
      {
        datetime: "2020-03-10T11:45:00",
        soc: "15",
        chargingPower: 130,
        status: "charging",
      },
      {
        datetime: "2020-03-10T12:00:00",
        soc: "20",
        chargingPower: 150,
        status: "charging",
      },
      {
        datetime: "2020-03-10T12:15:00",
        soc: "25",
        chargingPower: 0,
        status: "waiting",
      },
    ],
  };

  return getChargingData(input[0], input[1]).then((data) => {
    expect(data).not.toBe(output);
  });
});
