require("module-alias/register");
require("dotenv").config();

const { swaggerSpec } = require("$configs/init");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const connectMongo = require("$database/Mongo.database.ts");
const routes = require("$routes/init.ts").default;

app.use(express.json());
app.use("/api", routes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);
connectMongo;

app.listen(process.env.SERVER_PORT, (err: Error) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  }
});
