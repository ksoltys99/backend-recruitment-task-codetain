import { createDataTemplate } from "../src/createDataTemplate";
import { CarAvgCp } from "../src/types";
describe("data template test", () => {
  test("should create simple data template with vin and avg chaging power", () => {
    const input: CarAvgCp[] = [{ vin: "PL1234231", avg_cp: 100 }];
    const output = `<p>Vin: ${input[0].vin}</p> <p>Average charging power: ${input[0].avg_cp}</p><hr>`;

    expect(createDataTemplate(input)).toBe(output);
  });
});
