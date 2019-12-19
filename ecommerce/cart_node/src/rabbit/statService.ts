"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import { RabbitDirectEmitter } from "./tools/directEmitter";
import { IRabbitMessage } from "./tools/common";
/**
 * @api {direct} stat/stat-article Estadisitica de Articulos y Carritos
 * @apiGroup RabbitMQ POST
 *
 * @apiDescription Cart enviá un mensaje a Stats para asentar estadisitica de cada carrito y articulo que paso por el carrito.
 *
 * @apiExample {json} Mensaje
 *     {
 *        "type": "stat-article",
 *        "queue": "cartstat",
 *        "exchange": "cartstat",
 *         "message": {
 *             "cartId": "{cartId}",
 *             "orderId": "{orderId}",
 *             "articleId": "{articleId}",
 *             "quantity": {quantity},
 *             "time": "{time}""
 *        }
 *     }
 */
/**
 * Cart enviá un mensaje a Stats para asentar estadisitica de cada carrito y articulo que paso por el carrito.
 */
export async function sendStatArticle(cartId: string, orderId: string, articleId: string, quantity: number): Promise<IRabbitMessage> {
    const time = new Date();
    const message: IRabbitMessage = {
        type: "stat-article",
        exchange: "cartstat",
        queue: "cartstat",
        message: {
            cartId: cartId,
            orderId: orderId,
            articleId: articleId,
            quantity: quantity,
            time: time
        }
    };
    console.log("sendStatArticle" + JSON.stringify(message));
    return RabbitDirectEmitter.getEmitter("cartstat", "cartstat").send(message);
}