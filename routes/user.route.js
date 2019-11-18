const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user.controller");

router.post("/add", user_controller.create_user);
router.post("/auth/login", user_controller.login);
router.put("/update/:user_name", user_controller.update_user);

module.exports = router;
