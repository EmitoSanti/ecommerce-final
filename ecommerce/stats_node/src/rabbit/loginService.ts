"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import * as env from "../server/environment";
import { RabbitFanoutConsumer } from "./tools/fanoutConsumer";

const conf = env.getConfig(process.env);

interface IRabbitMessage {
    type: string;
    message: any;
}

export function init() {
    const fanout = new RabbitFanoutConsumer("auth");
    fanout.addProcessor("login", processLogin);
    fanout.init();
}

/**
 * @api {fanout} auth/login Login de Usuarios
 * @apiGroup RabbitMQ GET
 *
 * @apiDescription Escucha de mensajes login desde auth.
 *
 * @apiSuccessExample {json} Mensaje
 *     {
 *        "type": "login",
 *        "message": "{tokenId}"
 *     }
 */
function processLogin(rabbitMessage: IRabbitMessage) {
    console.log("RabbitMQ Consume login " + rabbitMessage.message);
}
