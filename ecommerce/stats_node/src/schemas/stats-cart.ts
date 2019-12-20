"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface IStatsCarts extends Document {
  cartId: string;
  orderId: string;
  countArticles: number;
  created: string;
  updated: Date;
  enabled: Boolean;
  addQuantity: Function;
  decrementQuantity: Function;
  deprecateCart: Function;
}

/**
 * Esquema Stats Cart
 */
const StatsCartSchema = new Schema({
  cartId: {
    type: String,
    trim: true,
    default: "",
    required: "El cartId asociado al cart"
  },
  orderId: {
    type: String,
    trim: true
  },
  countArticles: {
    type: Number
  },
  created: {
    type: String
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "statscart" });

StatsCartSchema.index({ cartId: 1, enabled: -1 });
StatsCartSchema.index({ cartId: 1, orderId: 1 });

/**
 * Incrementa el campo countArticles del carrito
 */
StatsCartSchema.methods.addArticle = function (value: number) {
  if (value > 1) {
    this.countArticle = this.countArticle + value;
  } else {
    this.countArticle++;
  }
};

/**
 * Decrementa el campo countArticles del carrito
 */
StatsCartSchema.methods.decrementQuantity = function () {
  console.log("viejo countUser: " + this.countUser);
  if (this.countUser > 0) {
    this.countUser--;
  }
  console.log("nuevo countUser: " + this.countUser);
};

/**
 * Depreca el carrito
 */
StatsCartSchema.methods.deprecateCart = function () {
  console.log("viejo enabled: " + this.enabled);
  this.enabled = false;
  console.log("nuevo enabled: " + this.enabled);
};

/**
 * Trigger antes de guardar
 */
StatsCartSchema.pre("save", function (this: IStatsCarts, next) {
  this.updated = new Date();
  next();
});

export let StatsCart = model<IStatsCarts>("StatsCart", StatsCartSchema);
