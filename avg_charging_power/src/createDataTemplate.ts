import { CarAvgCp } from "./types";

export const createDataTemplate = (data: CarAvgCp[]) => {
  let template = ``;
  data.forEach((element: CarAvgCp) => {
    template += `<p>Vin: ${element.vin}</p> <p>Average charging power: ${element.avg_cp}</p><hr>`;
  });
  return template;
};
