const config = require("config");
const ordersServiceMongo = require("../mongodb/orders/ordersService");
const dbOption = config.get("dbOption");

const createOrders = (userData) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.createOrders(userData);
  }
};

const getAllOrders = () => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.getAllOrders();
  }
};

const getOrdersdById = (id) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.getOrdersdById(id);
  }
};

const getOrdersByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.getOrdersByBizNumber(bizNumber);
  }
};

const getOrdersByEmail = (email) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.getOrdersByEmail(email);
  }
};

const getOrdersByUserId = (userId) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.getOrdersByUserId(userId);
  }
};


const deleteOrders = (id) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.deleteOrders(id);
  }
};
const getOrdersByUserIdFindOne = (userId) => {
  if (dbOption === "mongo") {
    return ordersServiceMongo.getOrdersByUserIdFindOne(userId);
  }
};


// const findIdMenuOrder = (cardId) => {
//   if (dbOption === "mongo") {
//     return ordersServiceMongo.findIdMenuOrder(cardId);
//   }
// };

module.exports = {
  createOrders,
  getAllOrders,
  getOrdersdById,
  getOrdersByBizNumber,
  getOrdersByEmail,
  getOrdersByUserId,
  deleteOrders,
  getOrdersByUserIdFindOne,
};
