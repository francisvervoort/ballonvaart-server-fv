const router = require("express").Router();
const controller = require("./controller");

router.post("/registreren", controller.registreren);
router.post("/aanmelden", controller.aanmelden);

module.exports = router;