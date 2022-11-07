import { calculateAvgChargingPower } from "../src/calculateAvgChargingPower";
import { ChargingData } from "../src/types";

describe("charging power calculation function", () => {
  test("should calculate avg charging power from given data", () => {
    const input1: ChargingData = {
      vin: "PL1231242",
      carStatistics: [
        {
          datetime: "2020-03-10T11:00:00",
          soc: "10",
          chargingPower: 50,
          status: "waiting",
        },
        {
          datetime: "2020-03-10T11:15:00",
          soc: "20",
          chargingPower: 100,
          status: "waiting",
        },
        {
          datetime: "2020-03-10T11:30:00",
          soc: "30",
          chargingPower: 150,
          status: "waiting",
        },
      ],
    };

    const input2: ChargingData = {
      vin: "PL1231242",
      carStatistics: [
        {
          datetime: "2020-03-10T11:00:00",
          soc: "10",
          chargingPower: 50,
          status: "charging",
        },
        {
          datetime: "2020-03-10T11:15:00",
          soc: "20",
          chargingPower: 100,
          status: "charging",
        },
        {
          datetime: "2020-03-10T11:30:00",
          soc: "30",
          chargingPower: 150,
          status: "charging",
        },
      ],
    };

    const input3: ChargingData = {
      vin: "PL1231242",
      carStatistics: [
        {
          datetime: "2020-03-10T11:00:00",
          soc: "10",
          chargingPower: 50,
          status: "waiting",
        },
        {
          datetime: "2020-03-10T11:15:00",
          soc: "20",
          chargingPower: 100,
          status: "waiting",
        },
        {
          datetime: "2020-03-10T11:30:00",
          soc: "30",
          chargingPower: 150,
          status: "waiting",
        },
      ],
    };

    const output1 = { vin: "PL1231242", avgChargingPower: 0 };
    const output2 = { vin: "PL1231242", avgChargingPower: 100 };
    const output3 = { vin: "PL1231242", avgChargingPower: undefined };

    expect(calculateAvgChargingPower(input1)).toStrictEqual(output1);
    expect(calculateAvgChargingPower(input2)).toStrictEqual(output2);
    expect(calculateAvgChargingPower(input3)).not.toEqual(output3);
  });
});
