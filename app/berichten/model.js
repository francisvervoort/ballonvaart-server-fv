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

berichtSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  }
});


module.exports = mongoose.model("Bericht", berichtSchema, "berichten");