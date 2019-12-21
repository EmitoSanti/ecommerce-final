"use strict";

import * as async from "async";
import { RestClient } from "typed-rest-client/RestClient";
import * as env from "../server/environment";
import * as error from "../server/error";
import { StatsArticle, IStatsArticles } from "../schemas/stats-article";
import { StatsCart, IStatsCarts } from "../schemas/stats-cart";
import { StatsUser, IStatsUsers } from "../schemas/stats-user";
import { StatsHistory, IStatsHistory } from "../schemas/stats-history";
import * as _ from "lodash";
import * as moment from "moment";
const conf = env.getConfig(process.env);

/**
 * Creacion de un nuevo registro para la estadistica por tiempo de los usuarios
 */
export function createUserStats(type: string, accion: string, time: Date): Promise<IStatsUsers> {
    console.log("createUserStats");

    return new Promise<IStatsUsers>((resolve, reject) => {
        const stats = new StatsUser();
        stats.typeTime = type;
        stats.accionUser = accion;

        if (type === "minute") {
            stats.created = time.toString().slice(0, 16);
        }
        if (type === "hour") {
            stats.created = time.toString().slice(0, 13);
        }

        // Then save the user
        console.log("stats.save");
        stats.save(function (err: any) {
            if (err) reject(err);
            resolve(stats);
            console.log("err: " + err + " stats: " + JSON.stringify(stats));
        });
    });
}

/**
 * Incrementa un campo del registro para la estadistica por tiempo de los usuarios
 */
export async function addUserStats(accion: string, time: Date): Promise<void> {
    console.log("addUserStats");
    console.log("accion: " + accion + " time: " + time);

    try {
        const minutes = time.toString().slice(0, 16);
        console.log("minutes: " + minutes);
        const hours = time.toString().slice(0, 13);
        console.log("minutes: " + hours);

        const statsMinutes = await StatsUser.findOne({ typeTime: "minute", accionUser: accion, created: minutes}).exec();
        const statsHour = await StatsUser.findOne({ typeTime: "hour", accionUser: accion, created: hours}).exec();

        console.log("lodash statsMinutes: " + _.isNull(statsMinutes) + " " + statsMinutes);
        if (!_.isNull(statsMinutes)) {
            console.log("save statsMinutes : " + statsMinutes);
            statsHour.countUser++;
            // Save the Stat User
            await statsMinutes.save();
            console.log("Save statsMinutes: " + JSON.stringify(statsMinutes));
        } else {
            console.log("Not statsMinutes : " + statsMinutes);
            createUserStats("minute", accion, time);
        }

        console.log("lodash statsHour: " + _.isNull(statsHour) + " " + statsHour);
        if (!_.isNull(statsHour)) {
            console.log("save statsHour : " + statsHour);
            statsHour.countUser++;
            // Save the Stat User
            await statsHour.save();
            console.log("Save statsHour: " + JSON.stringify(statsHour));
        } else {
            console.log("Not save statsHour: " + statsHour);
            createUserStats("hour", accion, time);
        }

        return Promise.resolve();

    } catch (err) {
        console.log("catch err: " + JSON.stringify(err));
        return Promise.reject(err);
    }
}

/**
 * Creacion de un nuevo registro para la estadistica por tiempo de los articulos
 */
export function createArticleStats(type: string, id: string, time: Date): Promise<IStatsArticles> {
    console.log("createArticleStats");

    return new Promise<IStatsArticles>((resolve, reject) => {
        const stats = new StatsArticle();
        stats.articleId = id;
        stats.typeTime = type;

        if (type === "minute") {
            stats.created = time.toString().slice(0, 16);
        }
        if (type === "hour") {
            stats.created = time.toString().slice(0, 13);
        }

        // Then save the user
        console.log("stats.save");
        stats.save(function (err: any) {
            if (err) reject(err);
            resolve(stats);
            console.log("err: " + err + " stats: " + JSON.stringify(stats));
        });
    });
}

/**
 * Incrementa un campo del registro para la estadistica por tiempo de los articulos
 */
export async function addArticleStats(id: string, time: Date): Promise<void> {
    console.log("addArticleStats");
    console.log("id: " + id + " time: " + time);

    try {
        const minutes = time.toString().slice(0, 16);
        console.log("minutes: " + minutes);
        const hours = time.toString().slice(0, 13);
        console.log("minutes: " + hours);

        const statsMinutes = await StatsArticle.findOne({ typeTime: "minute", articleId: id, created: minutes}).exec();
        const statsHour = await StatsArticle.findOne({ typeTime: "hour", articleId: id, created: hours}).exec();

        console.log("lodash statsMinutes: " + _.isNull(statsMinutes) + " " + statsMinutes);
        if (!_.isNull(statsMinutes)) {
            console.log("save statsMinutes : " + statsMinutes);
            statsMinutes.countArticle++;
            // Save the Stat Article
            await statsMinutes.save();
            console.log("Save statsMinutes: " + JSON.stringify(statsMinutes));
        } else {
            console.log("Not statsMinutes : " + statsMinutes);
            createArticleStats("minute", id, time);
        }

        console.log("lodash statsHour: " + _.isNull(statsHour) + " " + statsHour);
        if (!_.isNull(statsHour)) {
            console.log("save statsHour : " + statsHour);
            // statsHour.addQuantity();
            statsHour.countArticle++;
            // Save the Stat Article
            await statsHour.save();
            console.log("Save statsHour: " + JSON.stringify(statsHour));
        } else {
            console.log("Not save statsHour: " + statsHour);
            createArticleStats("hour", id, time);
        }

        return Promise.resolve();

    } catch (err) {
        console.log("catch err: " + JSON.stringify(err));
        return Promise.reject(err);
    }
}

interface Cart {
    cartId: string;
    orderId: string;
    articleId: string;
    quantity: number;
    time: Date;
}
/**
 * Creacion de un nuevo registro para la estadistica de carritos
 */
export function createCartStats(cart: Cart): Promise<IStatsCarts> {
    console.log("createArticleStats");

    return new Promise<IStatsCarts>((resolve, reject) => {
        const stats = new StatsCart();
        stats.cartId = cart.cartId;
        stats.orderId = cart.orderId;
        stats.countArticles = cart.quantity;
        stats.created = cart.time.toString().slice(0, 13);
        addArticleStats(cart.articleId, cart.time);

        // Then save the Stat Cart
        console.log("stats.save");
        stats.save(function (err: any) {
            if (err) reject(err);
            resolve(stats);
            console.log("err: " + err + " stats: " + JSON.stringify(stats));
        });
    });
}


/**
 * Incrementa un campo del registro para la estadistica de carritos
 */
export async function addCartStats(cart: Cart): Promise<void> {
    console.log("addCartStats");
    console.log("cart: " + JSON.stringify(cart));

    try {
        const statsHour = await StatsCart.findOne({ cartId: cart.cartId, orderId: cart.orderId }).exec();

        console.log("lodash statsHour: " + _.isNull(statsHour) + " " + statsHour);
        if (!_.isNull(statsHour)) {
            console.log("save statsHour : " + statsHour);
            if (cart.articleId) {
                statsHour.countArticles++;
                addArticleStats(cart.articleId, cart.time);
            } else {
                // statsHour.decrementQuantity();
            }

            // Save the Stat Cart
            await statsHour.save();
            console.log("Save statsHour: " + JSON.stringify(statsHour));
        } else {
            console.log("Not save statsHour: " + statsHour);
            createCartStats(cart);
        }

        return Promise.resolve();

    } catch (err) {
        console.log("catch err: " + JSON.stringify(err));
        return Promise.reject(err);
    }
}

export interface StatQuery {
    objId: boolean;
    collection: string;
    typeTime: string;
    accion: string;
    countObj: number;
    created: string;
    timeEnd: string;
    enabled: Boolean;
}



export async function getStats(data: StatQuery) {
    console.log("service getStats: " + JSON.stringify(data));
    let inicio: any;
    let fin: any;
    let type: string;
    const lab: any = [];
    const count: any = [];

    if (data.typeTime === "minutos" && !_.isUndefined(data.typeTime)) {
        type = "minute";
        inicio = data.created.slice(1, 25);
        fin = data.timeEnd.slice(1, 25);
    }
    if (data.typeTime === "horas" && !_.isUndefined(data.typeTime)) {
        type = "hour";
        inicio = data.created.slice(1, 11);
        fin = data.timeEnd.slice(1, 11);
    }
    console.log("inicio: " + inicio);
    console.log("fin: " + fin);
    switch (data.collection) {
        case "usuarios":
            console.log("usuarios ");
            return new Promise((resolve, reject) => {
                StatsUser.find({
                    $and: [
                        {typeTime: type},
                        {accionUser: data.accion},
                        {countUser: {$gte: data.countObj}},
                        {enabled: true},
                        {$and: [{updated: {$gte: new Date(inicio)}}, {updated: {$lt: new Date(fin)}}]}
                    ]
                }, function (err: any, result: IStatsUsers[]) {
                    if (err) return reject(err);
                    console.log("result: " + result);
                    console.log("result: " + _.size(result));
                    _.forEach(result, function(re) {
                        console.log("forEach: " + re.updated);
                        lab.push(re.updated.toString());
                        count.push(re.countUser);
                    });
                    const clear = {
                        title: data.collection + data.accion + data.typeTime,
                        labels: [lab],
                        datasets: [{
                            label: data.accion,
                            data: [count]
                            }
                        ]
                    };

                    console.log("clear: " + JSON.stringify(clear));
                    resolve(clear);
                });
            });
        case "carritos":
            console.log("carritos ");
            return new Promise((resolve, reject) => {
                StatsCart.find({
                    $and: [
                        {countArticles: {$gte: data.countObj}},
                        {enabled: true},
                        {$and: [{updated: {$gte: new Date(inicio)}}, {updated: {$lt: new Date(fin)}}]}
                    ]
                }, function (err: any, result: IStatsCarts[]) {
                    if (err) return reject(err);
                    console.log("result: " + result);
                    console.log("result: " + _.size(result));
                    _.forEach(result, function(re) {
                        console.log("forEach: " + re.cartId);
                        lab.push(re.cartId);
                        count.push(re.countArticles);
                    });
                    const clear = {
                        title: data.collection + data.accion + data.typeTime,
                        labels: [lab],
                        datasets: [{
                            label: data.created,
                            data: [count]
                            }
                        ]
                    };

                    console.log("clear: " + JSON.stringify(clear));
                    resolve(clear);
                });
            });
        case "articulos":
            console.log("articulos ");
            return new Promise((resolve, reject) => {
                console.log("busca");
                StatsArticle.find({
                    $and: [
                        {typeTime: type},
                        {countArticle: {$gte: data.countObj}},
                        {enabled: true},
                        {$and: [{updated: {$gte: new Date(inicio)}}, {updated: {$lt: new Date(fin)}}]}
                    ]
                }, function (err: any, result: IStatsArticles[]) {
                    if (err) return reject(err);
                    console.log("err: " + err);
                    console.log("result: " + result);
                    console.log("result: " + _.size(result));
                    _.forEach(result, function(re) {
                        console.log("forEach: " + re.updated);
                        lab.push(re.updated.toString());
                        count.push(re.countArticle);
                    });
                    const clear = {
                        title: data.collection + " " + data.accion + " " + data.typeTime,
                        labels: [lab],
                        datasets: [{
                            label: data.typeTime,
                            data: [count]
                            }
                        ]
                    };

                    console.log("clear: " + JSON.stringify(clear));
                    resolve(clear);
                });
            });
        default:
            console.log("Lo lamentamos, por el momento no disponemos de estadisticas de " + data.collection + ".");
    }
}
export function createHistory(body: IStatsHistory) {
    console.log("createHistory");
    return new Promise<string>((resolve, reject) => {
            const statHistory = <IStatsHistory>new StatsHistory();
            statHistory.title = body.title;
            statHistory.labels = body.labels;
            statHistory.datasets = body.datasets;

            // Then save the user
            statHistory.save(function (err: any) {
                if (err) reject(err);
                console.log("Stat History save");
                resolve("ok");
            });
    });
}

export function getHistory() {
    console.log("getHistory");
    return new Promise((resolve, reject) => {
        StatsHistory.find({
            enabled: true
        }, function (err: any, result: IStatsHistory[]) {
            if (err) return reject(err);
            console.log("result: " + result);
            console.log("result: " + _.size(result));
            resolve(result);
        });
    });
}