require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
// console.log("Current dir:", __dirname);
// require("dotenv").config({ path: __dirname + "/.env" });
// console.log("PORT from env:", process.env.PORT);
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      connectTimeout: 10000, // 10 วินาที
    },
    logging: console.log,
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log("DB Host:", process.env.DB_HOST);
console.log("DB Port:", process.env.DB_PORT);
console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB Name:", process.env.DB_NAME);
console.log("DB Dialect:", process.env.DB_DIALECT);

// ทดสอบเชื่อมต่อฐานข้อมูล
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
// ทดสอบ endpoint
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

const routeVersion = "v1";
const route = require(`./routes/${routeVersion}/api`);
app.use(`/api/${routeVersion}`, route);
// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on ${process.env.DB_HOST}:${PORT}`);
});
