const config = require("config");
const ordersTableServiceMongo = require("../mongodb/ordersTable/ordersServiceTable");
const dbOption = config.get("dbOption");

const createOrders = (userData) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.createOrders(userData);
  }
};

const getAllOrders = () => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.getAllOrders();
  }
};

const getOrdersdById = (id) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.getOrdersdById(id);
  }
};

const getOrdersByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.getOrdersByBizNumber(bizNumber);
  }
};

const getOrdersByEmail = (email) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.getOrdersByEmail(email);
  }
};

const getOrdersByUserId = (userId) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.getOrdersByUserId(userId);
  }
};


const deleteOrders = (id) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.deleteOrders(id);
  }
};
const getOrdersByUserIdFindOne = (userId) => {
  if (dbOption === "mongo") {
    return ordersTableServiceMongo.getOrdersByUserIdFindOne(userId);
  }
};

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
