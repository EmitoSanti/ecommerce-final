"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */

import { RabbitDirectConsumer } from "./tools/directConsumer";
import { IRabbitMessage } from "./tools/common";
import * as stats from "../stats/stats";

interface ICartMessage {
    cartId: string;
    orderId: string;
    articleId: string;
    quantity: number;
    time: Date;
}

export function init() {
    console.log("addProcessor");
    const cart = new RabbitDirectConsumer("cartstat", "cartstat");
    cart.addProcessor("stat-article", processStatCart);
    cart.init();
}

/**
 * @api {direct} cart/stat-article Para Estadisitica de Articulos y Carritos
 * @apiGroup RabbitMQ GET
 *
 * @apiDescription Escucha de mensajes stat-article desde cart. Para Estadisitica de Articulos y Carritos
 *
 * @apiSuccessExample {json} Mensaje
 *     {
 *        "type": "stat-article",
 *        "message": {
 *             "cartId": "{cartId}",
 *             "orderId": "{orderId}",
 *             "articleId": "{articleId}",
 *             "quantity": {quantity},
 *             "time": "{time}"
 *        }
 *     }
 */
function processStatCart(rabbitMessage: IRabbitMessage) {
    const stat = rabbitMessage.message as ICartMessage;
    console.log("processStatCart mensaje: " + JSON.stringify(stat));
    stats.addCartStats(stat);
}