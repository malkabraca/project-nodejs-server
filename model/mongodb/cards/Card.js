const mongoose = require("mongoose");
const {
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const cardSchema = new mongoose.Schema({
  title: DEFAULT_STRING_SCHEMA_REQUIRED,
  description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
  imageUrl: {
    type: String,
    validate: {
      validator: function (value) {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
        const filePathRegex = /^(\.\.\/)?[\w-\/.]+$/;
        return urlRegex.test(value) || filePathRegex.test(value);
      },
      message: "Invalid address format",
      trim: true,
       default:
         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  imageAlt: {
    type: String,
    maxLength: 256,
    trim: true,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  price: {
    type: Number,
    minLength: 1,
    required: true,
  },
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  category: DEFAULT_STRING_SCHEMA_REQUIRED,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
