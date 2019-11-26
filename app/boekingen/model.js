const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boekingSchema = new Schema(
    {
        datum: {
            type: Date,
            required: true
        },
        moment: {
            type: String,
            required: true,
            default: "avond",
            enum: ["ochtend", "avond"],
            lowercase: true,
        },
        aantalPersonen: {
            type: Number,
            required: true,
            min: 1,
            validator(value) {
                return Number.isInteger(value);
            },
            message: "{VALUE} is geen geheel getal."  //`${value} is geen getal`, maar nu via VALUE, template ingebouwd in mongoose
        },
        contactgegevens: {
            type: new Schema({
                naam: String,
                voornaam: String,
                email: String,  //normaal valideren
                telefoon: String
            }, {
                _id: false
            })
        }
    },
    {
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

//const boekingModel = mongose.model("Boeking", boekingSchema, boekingen);  boeking (s)!!, dus extra: ,boekingen
//module.exports = boekingModel; Variabele eerst maken heeft geen enkel nut, dus zie hieronder
module.exports = mongoose.model("Boeking", boekingSchema, "boekingen");
