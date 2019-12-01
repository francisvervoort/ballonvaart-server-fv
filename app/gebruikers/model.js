const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const gebruikerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    wachtwoord: {
      type: String,
      required: true,
      select: false
    },
    voornaam: {
      type: String,
      required: true
    },
    naam: {
      type: String,
      required: true
    },
    rol: {
      type: [String],
      enum: ["admin", "klant"],
      lowercase: true,
      default: ["klant"]
    }
  }, {
    timestamps: true
  }
);

gebruikerSchema.pre("save", async function (next) {
  if (!this.isModified("wachtwoord")) {
    return next();
  }

  const hash = await bcrypt.hash(this.wachtwoord, 8);
  if (!hash) {
    throw new Error("Hashen van wachtwoord mislukt!");
  }

  this.wachtwoord = hash;
  next();
});

gebruikerSchema.pre("findOneAndUpdate", async function (next) {
  const wachtwoord = this._update.wachtwoord;

  if (!wachtwoord) {
    return next();
  }

  const hash = await bcrypt.hash(wachtwoord, 8);
  if (!hash) {
    throw new Error("Hashen van wachtwoord mislukt!");
  }

  this._update.wachtwoord = hash;
  next();
});

gebruikerSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.wachtwoord;
  }
});

module.exports = mongoose.model("Gebruiker", gebruikerSchema, "gebruikers");