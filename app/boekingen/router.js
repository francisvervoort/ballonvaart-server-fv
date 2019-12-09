const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.list);
router.get("/geboektedata", controller.geboekteData);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;