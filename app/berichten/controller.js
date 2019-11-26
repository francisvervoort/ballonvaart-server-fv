const Bericht = require("./model");

exports.list = async (req, res) => {
  try {
    const berichten = await Bericht.find();
    return res.send(berichten);
  } catch (err) {
    return res.status(500).send("Serverfout");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const nieuwBericht = new Bericht(data);

  try {
    await nieuwBericht.save();
    return res.send(nieuwBericht);
  } catch (err) {
    return res.status(500).send("Toevoegen van bericht mislukt!");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Ongeldig id");
  }

  try {
    await Bericht.findByIdAndDelete(id);
    return res.send("Bericht verwijderd");
  } catch (err) {
    return res.status(500).send("Bericht verwijderen mislukt.");
  }
};