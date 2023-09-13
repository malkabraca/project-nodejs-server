const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiIdValidate = require ("./joi/idValidation")
const JoiOrdersValidationService= require ("./joi/recommendationValidation")
const validatorOption = config.get("validatorOption");
const joiProfail= require("./joi/propalValidation")

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};
const idUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiIdValidate.validateIdSchema(userInput);
  }
  throw new Error("validator undefined");
};

const recommendationValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return JoiOrdersValidationService.validateRecommendationSchema(userInput);
  }
  throw new Error("validator undefined");
};

const ProfailValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiProfail.validateProfailSchema(userInput);
  }
  throw new Error("validator undefined");
};


module.exports = {
  registerUserValidation,
  loginUserValidation,
  idUserValidation,
  recommendationValidation,
  ProfailValidation,
};
