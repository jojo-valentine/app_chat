const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("👋 Hello from API v1!");
});

module.exports = router;