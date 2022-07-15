const {Router} = require("express");
const docsControllers = require("../controllers/docs");

const router = Router();

router.get("/docslist", docsControllers.docsList_get);


module.exports = router;