const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  imageUrl: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .required(),
  imageAlt: Joi.string().min(2).max(256).allow(""),
  price: Joi.number().min(1).required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  category: Joi.string().min(2).max(256).required(),
});

const validateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput);
};

module.exports = {
  validateCardSchema,
};
