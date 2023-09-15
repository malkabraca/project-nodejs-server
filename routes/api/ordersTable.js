const express = require("express");
const router = express.Router();
const ordersTableServiceModel = require("../../model/ordersTableService/ordersTableService");
const normalizeOrders = require("../../model/ordersTableService/helpers/normalizationOrdersService");
const {createOrdersTableValidation}= require("../../validation/ordersTableValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddlewareOrderTable");
const authmw = require("../../middleware/authMiddleware");
const { idUserValidation } = require("../../validation/authValidationService");
const { logging } = require("googleapis/build/src/apis/logging");

// get all orders
//http://localhost:8181/api/ordersTable
router.get(
  "/",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const allOrders = await ordersTableServiceModel.getAllOrders();
      res.json(allOrders);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// get my-orders
//http://localhost:8181/api/ordersTable/my-orders
router.get("/my-orders", authmw, async (req, res) => {
  try {
    const myOrders = await ordersTableServiceModel.getOrdersByUserId(
      req.userData._id
    );
    res.json(myOrders);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get order by id
//http://localhost:8181/api/ordersTable/:id
router.get(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const cardFromDB = await ordersTableServiceModel.getOrdersdById(req.params.id);
      res.json(cardFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// create orders
//http://localhost:8181/api/ordersTable
router.post("/", authmw, async (req, res) => {
  try {
    await createOrdersTableValidation(req.body);
    let normalOrders = await normalizeOrders(req.body, req.userData._id);
    const dataFromMongoose = await ordersTableServiceModel.createOrders(
      normalOrders
    );
    res.json({ msg: "Reception order" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// admin
//http://localhost:8181/api/ordersTable/:id
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const cardFromDB = await ordersTableServiceModel.deleteOrders(req.params.id);
      if (cardFromDB) {
        res.json({ msg: "order deleted" });
      } else {
        res.json({ msg: "could not find the order" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
