const Joi = require("joi");

const ordersSchema = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(1).required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  takeAway: Joi.boolean().required(),
});

const validateOrdersSchema = (userInput) =>
  ordersSchema.validateAsync(userInput);

module.exports = {
  validateOrdersSchema,
};
