const express = require("express");

const api = express.Router();

api.get("/hello", (req, res) => {
  res.json({ message: "Hello from /api/hello!" });
});

api.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = api;
