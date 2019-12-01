const Bericht = require("./model");

exports.list = async (req, res) => {
    const berichten = await Bericht.find();
    return res.send(berichten);
};

exports.create = async (req, res) => {
  const data = req.body;
  const nieuwBericht = new Bericht(data);

  await nieuwBericht.save();
  return res.send(nieuwBericht);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.badRequest();
  }
  await Bericht.findByIdAndDelete(id);
  return res.success("Bericht verwijderd");  //was: return res.send("Bericht verwijderd"  kan ook elders);
};