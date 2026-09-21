const express = require("express");

const api = express.Router();

api.get("/hello", (req, res) => {
  res.json({ message: "Hello from /api/hello!" });
});

api.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

api.get("/echo", (req, res) => {
  res.json({ q: req.query.q });
});

api.post("/echo", (req, res) => {
if (
  req.body == null ||
  (typeof req.body === "object" && Object.keys(req.body).length === 0)
) {
    return res.status(400).json({ error: "body is required" });
  }
  if (typeof req.body !== "string") {
    return res.status(400).json({ error: "body must be a string" });
  }
  res.json({ q: req.body });
});

api.get("/slow", (req, res) => {
  const started = Date.now();
  let finished = false;
  const timer = setTimeout(() => {
    if (finished) return;
    finished = true;
    res.json({ elapsedMs: Date.now() - started });
  }, 2000);
  req.once("close", () => {
    finished = true;
    clearTimeout(timer);
  });
});

module.exports = api;
