require("./database/connect");
const express = require("express");
const cors = require("cors");
const app = express();

const routes = require("./routes");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`🚀 Running in ${port}`);
});
