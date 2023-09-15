const Orders = require("./Orders");

const createOrders = (userData) => {
  const orders = new Orders(userData);
  return orders.save();
};

const getOrdersByEmail = (email) => {
  return Orders.findOne({ email });
};

const getAllOrders = () => {
  return Orders.find();
};

const getOrdersdById = (id) => {
  return Orders.findById(id);
};

const getOrdersByBizNumber = (bizNumber) => {
  return Orders.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const getOrdersByUserId = (userId) => {
  return Orders.find({ user_id: userId });
};
const deleteOrders = (id) => {
  return Orders.findByIdAndDelete(id);
};

const getOrdersByUserIdFindOne = async(userId) => {
  return await Orders.findOne({ user_id: userId })
  .sort({ createdAt: -1 }).limit(1);
};



module.exports = {
  createOrders,
  getOrdersByEmail,
  getAllOrders,
  getOrdersdById,
  getOrdersByBizNumber,
  getOrdersByUserId,
  deleteOrders,
  getOrdersByUserIdFindOne,
};
