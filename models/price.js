const mongoose = require('mongoose');

const priceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    users: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// priceSchema.plugin(toJSON);
// priceSchema.plugin(paginate);
const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
