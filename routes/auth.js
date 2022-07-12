const {Router} = require("express");
const authControllers = require("../controllers/auth");

const router = Router();

router.post("/signup", authControllers.signup_post);

module.exports = router;