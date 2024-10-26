// index.js
const express = require("express");
const app = express();
const port = 3000;

app.get("/health", (req, res) => {
  console.log("Health check");
  res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
