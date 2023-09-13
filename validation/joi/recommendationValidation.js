const Joi = require("joi");

const recommendationSchema = Joi.object({
  recommendations: Joi.string().max(1024).allow(""),
});
const validateRecommendationSchema = (userInput) => {
  return recommendationSchema.validateAsync(userInput);
};

module.exports = {
  validateRecommendationSchema,
};
