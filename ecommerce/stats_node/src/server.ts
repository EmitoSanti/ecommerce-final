"use strict";

import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import * as logoutObserver from "./rabbit/logoutService";
import * as loginObserver from "./rabbit/loginService";
import * as cartObserver from "./rabbit/cartService";
import * as env from "./server/environment";
import { Config } from "./server/environment";
import * as express from "./server/express";

// Variables de entorno
const conf: Config = env.getConfig(process.env);

// Mejoramos el log de las promesas
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
});

// Establecemos conexión con MongoDD
mongoose.connect(conf.mongoDb, {}, function (err: MongoError) {
  if (err) {
    console.error("No se pudo conectar a MongoDB!");
    console.error(err.message);
    process.exit();
  } else {
    console.log("MongoDB conectado.");
  }
});

// Se configura e inicia express
const app = express.init(conf);

logoutObserver.init();
loginObserver.init();
cartObserver.init();

app.listen(conf.port, () => {
  console.log(`Stats Server escuchando en puerto ${conf.port}`);
});

module.exports = app;
