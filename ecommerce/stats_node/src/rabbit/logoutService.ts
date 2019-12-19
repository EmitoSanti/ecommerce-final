"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import * as env from "../server/environment";
import { RabbitFanoutConsumer } from "./tools/fanoutConsumer";
import * as stats from "../stats/stats";

const conf = env.getConfig(process.env);

interface IRabbitMessage {
    type: string;
    message: any;
    time: Date;
}

export function init() {
    const fanout = new RabbitFanoutConsumer("auth");
    fanout.addProcessor("logout", processLogout);
    fanout.init();
}

/**
 * @api {fanout} auth/logout Logout de Usuarios
 * @apiGroup RabbitMQ GET
 *
 * @apiDescription Escucha de mensajes logout desde auth.
 *
 * @apiSuccessExample {json} Mensaje
 *     {
 *        "type": "logout",
 *        "message": "NaN",
 *        "time": "Date"
 *     }
 */
export function processLogout(rabbitMessage: IRabbitMessage) {
    console.log("RabbitMQ Consume logout " + rabbitMessage.message);
    stats.addUserStats("logout", rabbitMessage.time);
}
