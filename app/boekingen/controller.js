const Boeking = require("./model");  //hier mongoose niet nodig

exports.list = async (req, res) => {
const boekingen = await Boeking.find();  // ev alleboekingen als naam
return res.send(boekingen);
};

exports.create = async (req, res) => {
    const data = req.body;  //tgv express.json
    const nieuweBoeking = new Boeking(data);

    await nieuweBoeking.save();
    return res.send(nieuweBoeking);
};

exports.update = async (req, res) => {
    const {id} = req.params;
    const data = req.body;

    if (!id || !data) {
        return res.badRequest();
    }

    const boeking = await Boeking.findByIdAndUpdate(id, data, { new: true});
    return res.send(boeking);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    /*  i.p.v. const id = req.params.id; 
    
    const params = {
        id: "sdjflkjljsjfqs54f5";
        ..:  "..". }*/

    if ( !id ) {
        return res.badRequest();
    }

    await Boeking.findByIdAndDelete(id);
    return res.send("Boeking verwijderd");
};