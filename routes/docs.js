const {Router} = require("express");
const docsControllers = require("../controllers/docs");

const router = Router();

router.get("/docslist", docsControllers.docsList_get);
router.post("/createDoc", docsControllers.createDoc_post);
router.get("/doc/:id", docsControllers.doc_get);
router.patch("/save", docsControllers.save_patch);
router.post("/addUser", docsControllers.addUser_post);
router.delete("/removeUser", docsControllers.removeUser_delete);


module.exports = router;