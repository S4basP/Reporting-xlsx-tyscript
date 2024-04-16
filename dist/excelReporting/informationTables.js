"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = exports.headersTable = void 0;
const luxon_1 = require("luxon");
const dt = luxon_1.DateTime.now();
let nameReport = `Report-${(_a = dt.toISODate()) === null || _a === void 0 ? void 0 : _a.toString()}-${(_b = dt.toISOTime()) === null || _b === void 0 ? void 0 : _b.toString()}`;
exports.headersTable = [
    { label: "idProduct", value: "Id of Product" },
    { label: "name", value: "Name Product" },
    { label: "quatity_Product", value: "Quantity Product" },
    { label: "registration_Date", value: "Registration Date" }
];
exports.setting = {
    fileName: `${nameReport}`,
    extraLength: 3,
    writeMode: "writeFile",
    writeOptions: {},
    RTL: true,
};
