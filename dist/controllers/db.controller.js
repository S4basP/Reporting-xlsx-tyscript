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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrerProduct = exports.getInformationProduct = void 0;
const db_1 = require("../db/db");
const luxon_1 = require("luxon");
const getInformationProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dt = luxon_1.DateTime.now();
    try {
        const [rows] = yield db_1.pool.query("select * from Product");
        return res.status(200).json(rows);
    }
    catch (error) {
        return res.status(500).send({
            message: `can't connect to database: ${error}`,
        });
    }
});
exports.getInformationProduct = getInformationProduct;
const registrerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity_Product } = req.body;
    const dt = luxon_1.DateTime.now();
    const fecha = `${dt.toISODate().toString()} ${dt.hour}:${dt.minute}:${dt.second}`;
    try {
        if (!name || !quantity_Product) {
            return res.status(400).send({
                message: "Empty  data error",
                data: {
                    name: name,
                    quantity_Product: quantity_Product,
                }
            });
        }
        else {
            const resp = yield db_1.pool.query("insert into Product (name, quantity_Product, registration_Date) value( ?, ?, ? )", [
                name,
                quantity_Product,
                fecha
            ]);
            res.status(200).send({
                resOfDatabase: resp,
                message: "data added correctly",
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            message: `can't connect to database: ${error}`,
        });
    }
});
exports.registrerProduct = registrerProduct;
