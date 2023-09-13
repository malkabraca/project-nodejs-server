const Joi = require("joi");

const ordersTableSchema = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  date:Joi.string().regex(new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)).required(),
  time:Joi.string().regex(new RegExp( /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)).required(),
  numOfPeople:Joi.string().min(1).max(10).required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
});

const validateOrdersTableSchema = (userInput) =>
ordersTableSchema.validateAsync(userInput);

module.exports = {
  validateOrdersTableSchema,
};
