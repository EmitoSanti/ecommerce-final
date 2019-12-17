"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface ICartDetail {
  articleId: string;
  quantity: number;
}

export interface IStatsCart extends Document {
  userId: string;
  cartId: string;
  orderId: string;
  cartDetail: ICartDetail[];
  updated: Date;
  created: Date;
  enabled: Boolean;
  addDetail: Function;
  incrementDetail: Function
}


/**
 * Esquema del cart
 */
const StatsCartSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    default: "",
    required: "El userId asociado al cart"
  },
  orderId: {
    type: String,
    trim: true
  },
  cartDetail: [{
    articleId: {
      type: String,
      required: "El articlelId agregado al cart",
      trim: true
    },
    quantity: {
      type: Number
    }
  }],
  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "cart" });

StatsCartSchema.index({ userId: 1, enabled: -1 });
StatsCartSchema.index({ userId: 1, orderId: 1 });

/**
 * Agrega un articulo al carrito
 */
StatsCartSchema.methods.addArticle = function (article: ICartDetail) {
  for (let _i = 0; _i < this.articles.length; _i++) {
    const element: ICartDetail = this.cartDetail[_i];
    if (element.articleId == article.articleId) {
      element.quantity = Number(element.quantity) + Number(article.quantity);
      return;
    }
  }

  this.articles.push(article);
  return;
};

/**
 * Trigger antes de guardar
 */
StatsCartSchema.pre("save", function (this: IStatsCart, next) {
  this.updated = new Date();

  next();
});

export let Cart = model<IStatsCart>("StatsCart", StatsCartSchema);
