const mongoose = require("mongoose");


const schema = new mongoose.Schema({
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
  orderStatus: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date:{
    type: String,
    required: true,
    match: new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
  },
  time:{
    type: String,
    required: true,
    match: new RegExp( /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
  },
  numOfPeople:{
    type: Number,
    required: true,
    minlength: 1,
    maxlength:10 ,
  },
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const OrderTable = mongoose.model("ordersTables", schema);

module.exports = OrderTable;
