const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const gebruikerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true    //niet retroactief
    },
    wachtwoord: {
      type: String,
      required: true,
      select: false        // houdt wachtwoord uit object dat doorgestuurd wordt (bij find o.a.)
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
      enum: ["admin", "klant"],   // "pr", "superadmin"]
      lowercase: true,
      default: ["klant"]
    }
  },  
  {
    timestamps: true
  }
);

gebruikerSchema.pre("save", async function (next) {    // geen => ivm andere betekenins van 'this': bij arrow is this de omringende scoop; niet de fie/blok zelf
  if (!this.isModified("wachtwoord")) {
    return next();
  }

  const hash = await bcrypt.hash(this.wachtwoord, 8);  // salt: 8 zorgt dat ww alleen voor deze website kan gebruikt worden.
  if (!hash) {
    throw new Error("Hashen van wachtwoord mislukt!");
  }

  this.wachtwoord = hash;
  next();                    //zien of er nog volgende hooks zijn, indien niet de "save" verwerken
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
    delete ret.wachtwoord;     // geeft geen fout als er geen wachtwoord is
  }
});

module.exports = mongoose.model("Gebruiker", gebruikerSchema);   /* , "gebruikers"*/
