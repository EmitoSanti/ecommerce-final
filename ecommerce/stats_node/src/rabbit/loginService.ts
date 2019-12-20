"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import * as env from "../server/environment";
import { RabbitFanoutConsumer } from "./tools/fanoutConsumer";
import * as stats from "../stats/stats";
import { RabbitDirectConsumer } from "./tools/directConsumer";

const conf = env.getConfig(process.env);

interface IRabbitMessage {
    type: string;
    message: any;
    time: Date;
}

interface ICartMessage {
    cartId: string;
    orderId: string;
    articleId: string;
    quantity: number;
    time: Date;
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
 *        "type": "logout",
 *        "message": "NaN",
 *        "time": "Date"
 *     }
 */
export function processLogin(rabbitMessage: IRabbitMessage) {
    // stats.createUserStats(rabbitMessage.message, rabbitMessage.time);
    stats.addUserStats("login", rabbitMessage.time);
    console.log("RabbitMQ Consume login " + rabbitMessage.message + " " + rabbitMessage.time);
}
