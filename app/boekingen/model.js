const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boekingSchema = new Schema(
  {
    datum: {
      type: String,
      required: true
    },
    moment: {
      type: String,
      required: true,
      default: "avond",
      enum: ["ochtend", "avond"],
      lowercase: true
    },
    aantalPersonen: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      validate: {
        validator(value) {
          return Number.isInteger(value);
        },
        message: "{VALUE} is geen geheel getal."
      }
    },
    type: {
      type: String,
      required: true,
      enum: ["classic", "ontbijt", "luxe"],
      lowercase: true,
      default: "classic"
    },
    gebruiker: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Gebruiker"
    }
    // contactgegevens: {
    //   type: new Schema({
    //     naam: String,
    //     voornaam: String,
    //     email: String,
    //     telefoon: String
    //   }, {
    //     _id: false
    //   })
    // }
  }, {
    timestamps: true
  }
);

boekingSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model("Boeking", boekingSchema, "boekingen");