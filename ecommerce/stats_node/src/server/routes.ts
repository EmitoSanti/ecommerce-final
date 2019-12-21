"use strict";

import { Express } from "express";
import * as token from "../token";
import * as stat from "../stats";
import * as error from "./error";
import * as express from "express";
import { NextFunction } from "connect";

/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
export function init(app: Express) {
  app.route("/v1/stats").get(validateToken, getStatS);
  app.route("/v1/stats/createhistory").post(createHistory, createHistory);
  app.route("/v1/stats/history").get(validateToken, getHistory);
}

interface IUserSessionRequest extends express.Request {
  user: token.ISession;
}

/**
 * @apiDefine AuthHeader
 *
 * @apiExample {String} Header Autorización
 *    Authorization=bearer {token}
 *
 * @apiErrorExample 401 Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
function validateToken(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  const auth = req.header("Authorization");
  if (!auth) {
    return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
  }

  token.validate(auth)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => error.handle(res, err));
}

/**
 * @api {get} /v1/stats Obtener Estadisticas Nuevas
 * @apiName Obtener Estadisticas Nuevas
 * @apiGroup Obtener Estadisticas Nuevas
 *
 * @apiDescription Devuelve las estadisticas requeridas
 *
 * @apiSuccessExample {json} Body
 *    HTTP/1.1 200 OK
 *    {
 *      "objId": "true|false",
 *      "collection": "{collection de la BD}",
 *      "typeTime": "{Filtro de por tiempo}",
 *      "accion": "{accion de auth}",
 *      "countObj": {Filtro por cantidad minima por articulo},
 *      "created": "{Fecha de Inicio}",
 *      "timeEnd": "{Fecha de finalizacion}",
 *      "enabled": true|false,
 *    }
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function getStatS(req: IUserSessionRequest, res: express.Response) {
  console.log("Routes getStats");
  console.log("parametros " + JSON.stringify(req.query));
  stat.getStats(req.query)
  .then(stat => {
    res.json(stat);
  })
  .catch(err => {
    error.handle(res, err);
  });
}

/**
 * @api {post} /v1/stats/history/ Guardar estadistica
 * @apiName Guardar estadistica
 * @apiGroup Estadistica
 *
 * @apiDescription Guardar estadistica nueva.
 *
 * @apiExample {json} Body
 *    {
 *      "title": "{string}"
 *      "labels": "{string}",
 *      "datasets": [{label: {string}, [data: {number}]}],
 *      "updated": "{Fecha ultima actualización}",
 *      "created": "{Fecha creado}"
 *    }
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "menssage": "{string}"
 *     }
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function createHistory(req: IUserSessionRequest, res: express.Response) {
  console.log("Routes createHistory");
  try {
    const saveStat = await stat.createHistory(req.body);
    res.json({ menssage: saveStat });
    res.send();
  } catch (err) {
    error.handle(res, err);
  }
}

/**
 * @api {get} /v1/stat/history/ Obtener Estadistica antigua
 * @apiName Obtener Estadistica antigua
 * @apiGroup Estadistica
 *
 * @apiDescription Obtener estadistica antigua del la base de datos
 *
 * @apiExample {json} Body
 *    {
 *      "label": "{string}",
 *      "data": [number]
 *    }
 *
 * @apiSuccessExample {json} Body
 *    {
 *      "stat": "{string}"
 *      "labels": "{string}",
 *      "datasets": [{data}],
 *      "updated": "{Fecha ultima actualización}",
 *      "created": "{Fecha creado}"
 *    }
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function getHistory(req: IUserSessionRequest, res: express.Response) {
  console.log("Routes getHistory");
  stat.getHistory()
  .then(stat => {
    res.json(stat);
  })
  .catch(err => {
    error.handle(res, err);
  });
}
