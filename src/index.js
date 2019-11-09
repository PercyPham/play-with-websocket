const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
