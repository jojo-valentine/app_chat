const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// เชื่อมต่อ MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

// ทดสอบเชื่อมต่อฐานข้อมูล
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to MySQL:", err);
  });

// ทดสอบ endpoint
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// เริ่มเซิร์ฟเวอร์
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
