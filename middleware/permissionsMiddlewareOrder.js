const CustomError = require("../utils/CustomError");
const { getOrdersdById } = require("../model/ordersService/ordersService");
const {idOrdersValidation}= require ("../validation/ordersValidationService")

const checkIfBizOwner = async (iduser, idOrder, res, next) => {
  try {
    await idOrdersValidation(idOrder);
    const orderData = await getOrdersdById(idOrder);
    if (!orderData) {
      return res.status(400).json({ msg: "No order found" });
    }
    if (orderData.user_id == iduser) {
      next();
    } else {
      res.status(401).json({ msg: "you not the biz owner" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const permissionsMiddleware = (isBiz, isAdmin, isBizOwner) => {
  return (req, res, next) => {
     console.log(req.userData);
    console.log("parms", req.params.id);
    console.log("user", req.userData._id);
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    // if (isBizOwner === req.userData.isBusiness && isBizOwner === true) {
      if (isBizOwner === true) {
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    
    res.status(401).json({ msg: "you not allowed to edit this card" });
  };
};

module.exports = permissionsMiddleware;
