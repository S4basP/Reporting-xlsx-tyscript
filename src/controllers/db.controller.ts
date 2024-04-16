import { RequestHandler } from "express";
import { pool } from "../db/db";
import {DateTime} from 'luxon'

export const getInformationProduct: RequestHandler = async (req, res) => {
  const dt = DateTime.now();
  
  try {
    const [rows] = await pool.query("select * from Product");
    return res.status(200).json(rows);

  } catch (error) {
    return res.status(500).send({
      message: `can't connect to database: ${error}`,
    });
  }
};

export const registrerProduct: RequestHandler = async (req, res) => {
  const { name, quantity_Product } = req.body;
   const dt = DateTime.now();
   const fecha = `${dt.toISODate().toString()} ${dt.hour}:${dt.minute}:${dt.second}`
  try {
    if (!name || !quantity_Product) {
      return res.status(400).send({
        message: "Empty  data error",
        data: {
            name: name,
            quantity_Product: quantity_Product,
            
        }
      });
    } else {
      const resp = await pool.query("insert into Product (name, quantity_Product, registration_Date) value( ?, ?, ? )", [
        name,
        quantity_Product,
        fecha
        
      ]);
      res.status(200).send({
        resOfDatabase: resp,
        message: "data added correctly",
        
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `can't connect to database: ${error}`,
    });
  }
};
