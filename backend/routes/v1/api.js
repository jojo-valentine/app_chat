const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("👋 Hello from API v1!");
});
router.use("/auth", require("./auth"));
router.use("/message", require("./message"));
module.exports = router;
