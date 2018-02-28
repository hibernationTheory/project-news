require("dotenv").config();
const express = require("express");

const config = require("./config");
const apiRouter = require("./routers/api");

const app = express();

app.set("port", config.port);

// Express only serves static assets in production
// TODO: change this to make use of config as well.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

app.use("/api", apiRouter);

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
