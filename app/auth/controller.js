const Gebruiker = require("../gebruikers/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registreren = async (req, res) => {
  const { email, wachtwoord, naam, voornaam } = req.body;
  console.log(naam);
  
  const nieuweGebruiker = new Gebruiker({email, wachtwoord, naam, voornaam});
  console.log(nieuweGebruiker);
  

  await nieuweGebruiker.save();
  const accessToken = jwt.sign({email: nieuweGebruiker.email}, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  return res.send({
    accessToken,
    nieuweGebruiker
  });
};

exports.aanmelden = async (req, res) => {
  const { email, wachtwoord } = req.body;

  if (!email || !wachtwoord) {
    return res.badRequest();
  }

  const gebruiker = await Gebruiker.findOne({email}).select("+wachtwoord");
  if (!gebruiker) {
    return res.badRequest();
  }

  const komtOvereen = bcrypt.compare(wachtwoord, gebruiker.wachtwoord);
  if (komtOvereen) {
    // Stuur JWT terug
    const accessToken = jwt.sign({email: gebruiker.email}, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    return res.send({
      accessToken,
      gebruiker
    });
  } else {
    return res.unauthorized();
  }
};
