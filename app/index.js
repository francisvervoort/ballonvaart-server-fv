const routerBoekingen = require("./boekingen/router");

module.exports = (app) => {
    app.use("/boekingen", routerBoekingen);
}