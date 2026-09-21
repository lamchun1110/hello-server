const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);
server.on("error", (err) => {
  console.error(`Server error: ${err.message}`);
});
