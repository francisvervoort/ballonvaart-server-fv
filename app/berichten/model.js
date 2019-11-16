const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const berichtSchema = new Schema(
  {
    naam: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    bericht: {
      type: String,
      required: true,
      maxlength: 150
    }
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model("Bericht", berichtSchema, "berichten");