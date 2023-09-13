const Joi = require("joi");

const profailSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  lastName: Joi.string().min(2).max(255).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .min(6)
    .max(256)
    .required()
    .email({ tlds: { allow: false } }),
  /* imageUrl: Joi.string().min(6).max(1024).allow(""), */ imageUrl:
    Joi.string()
      .regex(
        new RegExp(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
      )
      .allow(""),
  imageAlt: Joi.string().min(2).max(256).allow(""),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  recommendations: Joi.string().max(1400).allow("").allow(null),
  biz: Joi.boolean(),
});
const validateProfailSchema = (userInput) =>
  profailSchema.validateAsync(userInput);

module.exports = { validateProfailSchema };
