const Gebruiker = require("../gebruikers/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registreren = async (req, res) => {
  const data = req.body;
  const nieuwBericht = new Gebruiker(data);

  try {
    await nieuwBericht.save();
    return res.send(nieuwBericht);
  } catch (err) {
    return res.status(500).send("Toevoegen van bericht mislukt!");
  }
};

exports.aanmelden = async (req, res) => {
  const { email, wachtwoord } = req.body;

  if (!email || !wachtwoord) {
    return res.status(400).send("Ongeldige request.");
  }

  try {
    const gebruiker = await Gebruiker.findOne({email}).select("+wachtwoord");
    const komtOvereen = bcrypt.compare(wachtwoord, gebruiker.wachtwoord);
    if (komtOvereen) {
      // Stuur JWT terug
      const accessToken = jwt.sign({email: gebruiker.email}, "Tanuki", {
        expiresIn: "1d"
      });
      return res.send({
        accessToken,
        gebruiker
      });
    } else {
      return res.status(401).send("Wachtwoord onjuist.");
    }
  } catch (err) {
    return res.status(500).send("Serverfout");
  }
};