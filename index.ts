import { errorHandler } from "./middleware/errorHandler.middleware";
import path from "path";

require("module-alias/register");
require("dotenv").config();

const { swaggerSpec } = require("$configs/init");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const connectMongo = require("$database/Mongo.database.ts");
const routes = require("$routes/init.ts").default;
const cookieParser = require("cookie-parser");

connectMongo;

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.SERVER_PORT, (err: Error) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  }
});

app.use(errorHandler);
