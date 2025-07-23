const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/AuthController");
router.get("/hello", (req, res) => {
  res.send("👋 Hello from API v1!");
});

router.post("/register-user", AuthController.createUser);
router.post("/login/user", AuthController.login);
module.exports = router;
