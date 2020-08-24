const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.send("SERVER IS OK");
});

module.exports = route;
