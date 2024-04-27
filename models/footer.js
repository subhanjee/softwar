const mongoose = require('mongoose');

const footerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    svg: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
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
// footerSchema.plugin(toJSON);
// footerSchema.plugin(paginate);
const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
