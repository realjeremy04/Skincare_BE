import "module-alias/register";
const express = require("express");
const app = express();
const connectMongo = require("@database/Mongo.database");

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

connectMongo();
