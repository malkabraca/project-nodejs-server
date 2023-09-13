const express = require("express");
const router = express.Router();
const ordersServiceModel = require("../../model/ordersService/ordersService");
const normalizeOrders = require("../../model/ordersService/helpers/normalizationOrdersService");
const ordersValidationService = require("../../validation/ordersValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddlewareOrder");
const authmw = require("../../middleware/authMiddleware");
const { idUserValidation } = require("../../validation/authValidationService");
const { logging } = require("googleapis/build/src/apis/logging");

// get all orders
//http://localhost:8181/api/orders
router.get(
  "/",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const allOrders = await ordersServiceModel.getAllOrders();
      res.json(allOrders);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// get my-orders
//http://localhost:8181/api/orders/my-orders
router.get("/my-orders", authmw, async (req, res) => {
  try {
    const myOrders = await ordersServiceModel.getOrdersByUserId(
      req.userData._id
    );
    res.json(myOrders);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get order by id
//http://localhost:8181/api/orders/:id
router.get(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const cardFromDB = await ordersServiceModel.getOrdersdById(req.params.id);
      res.json(cardFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// create orders
//http://localhost:8181/api/orders
router.post("/", authmw, async (req, res) => {
  try {
    await ordersValidationService.createOrdersValidation(req.body);
    let normalOrders = await normalizeOrders(req.body, req.userData._id);
    const dataFromMongoose = await ordersServiceModel.createOrders(
      normalOrders
    );
    res.json({ msg: "Reception order" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// admin
//http://localhost:8181/api/orders/:id
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const cardFromDB = await ordersServiceModel.deleteOrders(req.params.id);
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

//get order FindOne dy user id
//http://localhost:8181/api/orders/my-order-findOne-returns id order
router.get("/my-order-findOne/:id", authmw, async (req, res) => {
  try {
    await idUserValidation(req.params.id);
    const myCards = await ordersServiceModel.getOrdersByUserIdFindOne(
      req.params.id
    );
    console.log("orderId", myCards?._id);
    res.json(myCards?._id);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//get order FindOne dy user id -returns any private order
//http://localhost:8181/api/orders/my-allorder-findOne
router.get("/my-allorder-findOne/:id", authmw, async (req, res) => {
  try {
    // console.log("body", req.params.id);
    await idUserValidation(req.params.id);
    const myCards = await ordersServiceModel.getOrdersByUserIdFindOne(
      req.params.id
    );
    res.json(myCards);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/orders/menuOrder/:id
router.patch("/menuOrder/:id", authmw, async (req, res) => {
  try {
    await idUserValidation(req.params.id);
    const orderId = req.params.id;
    // console.log(orderId);
    let cardLike = await ordersServiceModel.getOrdersdById(orderId);

    if (cardLike.menuOrder.find((cardId) => cardId[1] == req.body.card_id)) {
      const cardFiltered = cardLike.menuOrder.filter(
        (cardId) => cardId[1] != req.body.card_id
      );
      cardLike.menuOrder = cardFiltered;
      cardLike = await cardLike.save();
    } else {
      cardLike.menuOrder = [
        ...cardLike.menuOrder,
        [req.body.amount, req.body.card_id],
      ];
      cardLike = await cardLike.save();
    }
    res.json(cardLike);
  } catch (err) {
    console.log("Could not edit like:", err.message);
    console.log("erooooo", err);
    res.status(400).json(err);
  }
});

// http://localhost:8181/api/orders/orderStatus/:id
router.patch(
  "/orderStatus/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      let order = await ordersServiceModel.getOrdersdById(req.params.id);
      order.orderStatus = true;
      setTimeout(async () => {
        await order.save();
      }, 1 * 60 * 1000);
      res.json({ msg: "An order is currently in the works" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

// http://localhost:8181/api/orders/orderStatus/crmt/:id
router.patch(
  "/orderStatus/crmt/:id",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      let order = await ordersServiceModel.getOrdersdById(req.params.id);
      order.orderStatus = true;
      await order.save();
      res.json({ msg: "An order is currently in the works" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

// http://localhost:8181/api/orders/orderStatus/crmf/:id
router.patch(
  "/orderStatus/crmf/:id",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      let order = await ordersServiceModel.getOrdersdById(req.params.id);
      order.orderStatus = false;
      await order.save();
      res.json({ msg: "An order is currently in the works" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

module.exports = router;
