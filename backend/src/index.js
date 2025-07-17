const express = require("express");
const app = express();
const port = 3000;

app.get("/get/:id", (req, res) => {
  console.log(req.params);

  res.send("Hello World!");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
