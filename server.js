require("dotenv-flow").config({
    path: "./env"                  // pad nodig omdat er een tussenmap env gemaakt is
});
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

require ("./config/mongoose");

// zelfs "const router =" vervalt, het gebeurt vanzelf, met de const zou ik toch niets doen // was:  require("./router"); de eerste ./app is eigenlijk ./app/index.js, de laatste (app) is de app van lijn 5 = express()
// const router = require("./app/boekingen/router"); idem voor gebruikers, vaarten, ... , dus zou veel lijnen kunnen geven
//app.use("/ballonnen", router);  is van vroeger
require("./app")(app) 
const port = 7000;

app.use((req, res) => {
    return res.status(404).send ("Bron niet gevonden");
});

app.listen(port, ()=> {
    console.log (`Server luistert op poort ${port}`);
})