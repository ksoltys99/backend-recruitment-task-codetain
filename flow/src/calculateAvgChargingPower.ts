import { ChargingData, ChargingCarStatistics } from "./types";

export const calculateAvgChargingPower = (
  data: ChargingData
): { vin: string; avgChargingPower: number } => {
  let count = 0;
  let totalPower = 0;
  let statesOfCharging = [];
  data.carStatistics.forEach((element: ChargingCarStatistics) => {
    statesOfCharging.push(parseInt(element.soc));
    if (element.status === "charging") {
      count += 1;
      totalPower += element.chargingPower;
    }
  });
  if (count == 0) return { vin: data.vin, avgChargingPower: 0 };
  return { vin: data.vin, avgChargingPower: totalPower / count };
};
