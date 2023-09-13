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
    console.log(err);
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





//לבדוק אחכ האם נדרש כל השאלתות האלה

//get order FindOne dy user id
//http://localhost:8181/api/ordersTable/my-order-findOne-  return id order
router.get("/my-order-findOne/:id", authmw, async (req, res) => {
  try {
    // console.log("body", req.params.id);
    await idUserValidation(req.params.id);
    const myCards = await ordersTableServiceModel.getOrdersByUserIdFindOne(
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
//http://localhost:8181/api/ordersTable/my-allorder-findOne
router.get("/my-allorder-findOne/:id", authmw, async (req, res) => {
  try {
    // console.log("body", req.params.id);
    await idUserValidation(req.params.id);
    const myCards = await ordersTableServiceModel.getOrdersByUserIdFindOne(
      req.params.id
    );
    res.json(myCards);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/ordersTable/menuOrder/:id
router.patch("/menuOrder/:id", authmw, async (req, res) => {
  try {
    await idUserValidation(req.params.id);
    const orderId = req.params.id;
    // console.log(orderId);
    let cardLike = await ordersTableServiceModel.getOrdersdById(orderId);

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
      //cardLike.menuOrder.push({...req.body.card_id,Amount:req.body.amount})
      // cardLike.menuOrder.push([req.body.card_id, req.body.amountForOrder]);
      // for (let i = 0; i < amount; i++) {
      //   cardLike.menuOrder = [...cardLike.menuOrder, req.body.card_id];
      // }

      cardLike = await cardLike.save();
      // res.json({ msg: "The card has been removed rom the favorites list." });
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
      console.log("id",req.params.id);
      let order = await ordersTableServiceModel.getOrdersdById(
        req.params.id
      );
      console.log("order",order);
      order.orderStatus = true;
      console.log("orderrrrr",order);
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

module.exports = router;
