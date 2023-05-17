// importlar

const express = require("express");
const server = express();
const usersRouter = require("./users/users-router");
const middleware = require("./middleware/middleware");

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

//  global middleware'lar
server.use(express.json());
server.use(middleware.logger); //globalde middleware ekledik

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use("/api/users", usersRouter);

//  Endpointler
server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

//  error-handling middleware
server.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error!.." });
});

module.exports = server;
