"use strict";

import * as async from "async";
import { RestClient } from "typed-rest-client/RestClient";
import * as env from "../server/environment";
import * as error from "../server/error";
import { IStatsArticle } from "../schemas/stats-article";
import { IStatsCart, ICartDetail } from "../schemas/stats-cart";
import { StatsUser, IStatsUser, IUserDetail } from "../schemas/stats-user";
import { processLogin } from "../rabbit/loginService";
import { processLogout } from "../rabbit/logoutService";


const conf = env.getConfig(process.env);

export function createUserStats(id: string, time: Date): Promise<IStatsUser> {
    console.log("createUserStats");
    return new Promise<IStatsUser>((resolve, reject) => {
        const user = new StatsUser();
        user.userId = id;
        user.name = "Primero"; // falta
        // Then save the user
        console.log("user.save");
        user.save(function (err: any) {
            if (err) reject(err);
            resolve(user);
            console.log("err: " + err + " user: " + JSON.stringify(user));
        });
    });
}


interface AddArticleRequest {
    articleId?: string;
    quantity?: number;
}
/*
export async function addArticle(userId: string, body: AddArticleRequest): Promise<ICart> {
    try {
        body = await validateAddArticle(body);
        const cart = await currentCart(userId);
        const article: ICartArticle = {
            articleId: body.articleId,
            quantity: body.quantity
        };

        cart.addArticle(article);

        // Save the Cart
        return new Promise<ICart>((resolve, reject) => {
            cart.save(function (err: any) {
                if (err) return reject(err);

                resolve(cart);
            });
        });
    } catch (err) {
        return Promise.reject(err);
    }
}*/