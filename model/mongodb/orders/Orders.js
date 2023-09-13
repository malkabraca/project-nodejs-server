const mongoose = require("mongoose");
const Name = require("./Name");
const Address = require("./Address");

const schema = new mongoose.Schema({
  // name: Name,
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  // address: Address,
  city: {
    type: String,
    maxLength: 256,
    trim: true,
    minLength: 2,
    required: true,
  },
  street: {
    type: String,
    maxLength: 256,
    trim: true,
    minLength: 2,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
    trim: true,
    minLength: 1,
  },
  // isBusiness: { type: Boolean, default: false },
  takeAway: { type: Boolean, default: false },
  orderStatus: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  // menuOrder: [String],
  menuOrder: [[]],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  card_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const User = mongoose.model("orders", schema);

module.exports = User;
