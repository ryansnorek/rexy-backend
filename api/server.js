const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth.router");
const usersRouter = require("./routers/users-router");
const profileRouter = require("./routers/user-profile-router");

const server = express();
server.use(express.static(path.join(__dirname, "../client")));
server.use(express.json());
server.use(helmet());
server.use(cors());
corsOptions = {
  origin: 'http://localhost:3002',
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST"
}
server.use(cors(corsOptions));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/profile", profileRouter);

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//   });




server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
