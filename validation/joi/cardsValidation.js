const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  imageUrl: Joi.string()
    .custom((value, helpers) => {
      // const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=\u0590-\u05FF]*)?$/;
      const filePathRegex = /^(\.\.\/)?[\w-\/.]+\.[\w]+$/i;

      if (urlRegex.test(value) || filePathRegex.test(value)) {
        return value; 
      }
      return helpers.error("any.invalid"); 
    })
    .default(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    )
    .trim(),
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
