const Boeking = require("./model");  //hier mongoose niet nodig

exports.list = async (req, res) => {
    try {
    const boekingen = await Boeking.find();  // ev alleboekingen als naam
    return res.send(boekingen);
    } catch (err) {
        return res.status(500).send("Serverfout");
    }
}