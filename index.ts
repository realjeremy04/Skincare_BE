require("module-alias/register");
require("dotenv").config();

const { swaggerSpec } = require("$configs/init");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const connectMongo = require("$database/Mongo.database");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

connectMongo();
