"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_index_1 = __importDefault(require("./routes/routes.index"));
const excelReport_1 = require("./excelReporting/excelReport");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(routes_index_1.default);
app.set('port', '3000');
(0, excelReport_1.createReport)();
exports.default = app;
