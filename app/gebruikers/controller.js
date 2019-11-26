const Gebruiker = require("./model");

exports.list = async (req, res) => {
  try {
    const gebruikers = await Gebruiker.find();
    return res.send(gebruikers);
  } catch (err) {
    return res.status(500).send("Serverfout");
  }
};

exports.create = async(req, res) => {
  const data = req.body;

  const bestaandeGebruiker = await Gebruiker.find({email: data.email});
  if (bestaandeGebruiker) {
    return res.status(400).send(`Gebruiker1 met e-mailadres ${data.email} bestaat al.`);
  } 

  const nieuweGebruiker = new Gebruiker(data);

  try {
    await nieuweGebruiker.save();
    return res.send(nieuweGebruiker);
  } catch (err) {
    return res.status(500).send("Maken van gebruiker mislukt!");
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id || !data) {
    return res.status(400).send("Ongeldige aanvraag.");
  }

  const bestaandeGebruiker = await Gebruiker.find({email: data.email});
  if (bestaandeGebruiker) {
  return res.status(400).send(`Gebruiker2 met e-mailadres ${data.email}  bestaat al.`);
  }

  try {
    const gebruiker = await Gebruiker.findByIdAndUpdate(id, data, {new: true});
    return res.send(gebruiker);
  } catch (err) {
    return res.status(500).send("Updaten van gebruiker mislukt.");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Ongeldig id");
  }

  try {
    await Gebruiker.findByIdAndDelete(id);
    return res.send("Gebruiker verwijderd");
  } catch (err) {
    return res.status(500).send("Gebruiker verwijderen mislukt.");
  }
};