import express from "express";
import bodyParser from "body-parser";
import { customerRouter } from "./routers/customer.router.js";
import { appConfig } from "./config/app.js";

const app = express();

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", customerRouter);

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Listening on ${appConfig.port}`);
});
