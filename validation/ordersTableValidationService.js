const config = require("config");
const joiOrdersTableValidation = require("./joi/ordersTableValidation");
const joiIdValidate = require ("./joi/idValidation")

const validatorOption = config.get("validatorOption");

const createOrdersTableValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiOrdersTableValidation.validateOrdersTableSchema(userInput);
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
  createOrdersTableValidation,
  idOrdersValidation
};
