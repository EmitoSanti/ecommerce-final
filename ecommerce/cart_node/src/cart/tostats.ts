// toodo esto para el orto

"use strict";
/**
 * Servicios internos de Cart, normalmente son llamados por procesos Rabbit o background
 */

import { Cart, ICart } from "./schema";

export interface IToStats {
    cartId: string;
    orderId: string;
}

/**
 * Procesa una validación realizada a través de rabbit. adwaw d aad aw aw adw aw da dw aw da dw aw da dw aw da dw aw da dw aw da dw
 * Si un articulo no es valido se elimina del cart.dwa aw da dw aw da dw aw da dw aw da dw aw da dw aw da dw aw da dw
 */
export function toStats(data: IToStats) {
    console.log("RabbitMQ Consume toStats : " + data.cartId + " - " + data.orderId);

    Cart.findById(data.cartId, function (err: any, cart: ICart) {
        if (err) return;

        if (cart) {
            cart.orderId = data.orderId;

            // Save the Cart
            cart.save(function (err: any) {
            });
        }
    });
}

