"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReport = exports.changeFolder = void 0;
const luxon_1 = require("luxon");
const db_1 = require("../db/db");
const json_as_xlsx_1 = __importDefault(require("json-as-xlsx"));
const node_cron_1 = __importDefault(require("node-cron"));
const promises_1 = __importDefault(require("fs/promises"));
const dt = luxon_1.DateTime.now();
const nameDate = `Report-${dt.toISODate().toString()}-${dt.toISOTime().toString()}`;
const dataOfHeaders = [
    { label: "Id of Product", value: "id_Product" },
    { label: "Name", value: "name" },
    { label: "Quantity Product", value: "quantity_Product" },
    { label: "Registration Date", value: "registration_Date" },
];
const changeFolder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default.rename(`../../${nameDate}.xlsx`, `../filesXlsx/${nameDate}.xlsx`);
        console.log("File copied");
    }
    catch (error) {
        console.log("Can´t copie file");
    }
});
exports.changeFolder = changeFolder;
const information = () => __awaiter(void 0, void 0, void 0, function* () {
    const dt = luxon_1.DateTime.now();
    const nameDate = `Report-${dt.toISODate().toString()}-${dt.toISOTime().toString()}`;
    try {
        const [rows] = yield db_1.pool.query("select * from Product;");
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
        (0, json_as_xlsx_1.default)(data, setting);
    }
    catch (error) {
        console.log(error);
    }
});
const createReport = () => {
    node_cron_1.default.schedule('*/60 * * * * *', () => {
        information();
        console.log("Created Report!!");
        (0, exports.changeFolder)();
    });
};
exports.createReport = createReport;
