const express = require("express");
const api = require("./api");

const app = express();

app.use(express.json({ strict: false, limit: "1mb" }));
app.use("/api", api);

module.exports = app;
