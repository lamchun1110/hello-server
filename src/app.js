const express = require("express");
const api = require("./api");

const app = express();

app.use(express.json({ strict: false }));
app.use("/api", api);

module.exports = app;
