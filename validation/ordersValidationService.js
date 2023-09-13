const config = require("config");
const joiOrdersValidation = require("./joi/ordersValidation");
const joiIdValidate = require ("./joi/idValidation")

const validatorOption = config.get("validatorOption");

const createOrdersValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiOrdersValidation.validateOrdersSchema(userInput);
  }
  throw new Error("validator undefined");
};
const idOrdersValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiIdValidate.validateIdSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  createOrdersValidation,
  idOrdersValidation
};
