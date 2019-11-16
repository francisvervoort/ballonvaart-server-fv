const routerBoekingen = require("./boekingen/router");
const routerBerichten = require("./berichten/router");
const routerGebruikers = require("./gebruikers/router");
const routerAuth = require("./auth/router");

module.exports = (app) => {
  app.use("/boekingen", routerBoekingen);
  app.use("/berichten", routerBerichten);
  app.use("/gebruikers", routerGebruikers);
  app.use("/auth", routerAuth);
};