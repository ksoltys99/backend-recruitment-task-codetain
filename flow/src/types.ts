export interface Car {
  made: string;
  model: string;
  year: string;
  vin: string;
}

export interface ChargingData {
  vin: string;
  carStatistics: ChargingCarStatistics[];
}

export interface ChargingCarStatistics {
  datetime: string;
  soc: string;
  chargingPower: number;
  status: string;
}
