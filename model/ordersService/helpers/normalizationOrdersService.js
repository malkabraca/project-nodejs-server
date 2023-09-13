const config = require("config");
const normalizationOrdersMongo = require("../../mongodb/orders/helpers/normalizationOrders");
const dbOption = config.get("dbOption");

const normaliztionOrder = (order, userId, cardId)=> {
  if (dbOption === "mongo") {
    return normalizationOrdersMongo(order, userId, cardId);
  }
};

module.exports = normaliztionOrder;
