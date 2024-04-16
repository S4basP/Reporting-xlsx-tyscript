import { pool } from "../db/db";
import xlsx from "json-as-xlsx";
import cron from "node-cron";
import { DateTime } from "luxon";
import { rename } from "fs/promises";

const dataOfHeaders = [
  { label: "Id of Product", value: "id_Product" },
  { label: "Name", value: "name" },
  { label: "Quantity Product", value: "quantity_Product" },
  { label: "Registration Date", value: "registration_Date" },
];

const moveFileXlsx = async (nameDate: string) => {
  try {
    //await moveFile('./src/hola.txt', './src/docExcel/hola.txt');
    await rename(`./${nameDate}.xlsx`, `./src/docExcel/${nameDate}.xlsx`);
  } catch (error) {
    console.log(error);
  }
};

const information = async () => {
  const dt = DateTime.now();
  const nameDate = `Report-${dt.toISODate().toString()}-${dt
    .toISOTime()
    .toString()}`;
  try {
    const [rows] = await pool.query("select * from Product;");
    const dataRows = JSON.parse(JSON.stringify(rows));

    const data = [
      {
        sheet: "sheetOne",
        columns: dataOfHeaders,
        content: dataRows,
      },
    ];
    const setting = {
      fileName: nameDate,
      extraLength: 4,
      writeMode: "writeFile",
      writeOption: {},
      RTL: true,
    };

    xlsx(data, setting);

    moveFileXlsx(nameDate);
  } catch (error) {
    console.log(error);
  }
};

export const main = () => {
  cron.schedule("*/3 * * * * *", () => {
    information();
    console.log("Report Create");
  });
};
