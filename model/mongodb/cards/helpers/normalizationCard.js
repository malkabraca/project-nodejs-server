const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {

  return {
    ...card,
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
