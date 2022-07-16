const {Router} = require("express");
const docsControllers = require("../controllers/docs");

const router = Router();

router.get("/docslist", docsControllers.docsList_get);
router.post("/createDoc", docsControllers.createDoc_post);


module.exports = router;