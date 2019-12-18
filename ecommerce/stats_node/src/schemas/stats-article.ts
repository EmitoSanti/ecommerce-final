"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface IArticleDetail {
  date: Date;
  quantity: number;
 // hacer aumento de articulo incrementArticle: Function;
}

export interface IStatsArticle extends Document {
  articleId: string;
  articleDetail: IArticleDetail[];
  updated: Date;
  created: Date;
  enabled: Boolean;
  addDetail: Function;
}

/**
 * Esquema del cart
 */
const StatsArticleSchema = new Schema({
    articleId: {
    type: String,
    trim: true,
    default: "",
    required: "El userId asociado al cart"
  },
  articleDetail: [{
    date: {
      type: Date,
      required: "Fecha de articulo agregado a algun cart",
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
}, { collection: "statsarticle" });

StatsArticleSchema.index({ articleId: 1, enabled: -1 });

/**
 * Agrega el detalle, fecha y cantidad a la estadistica por articulo
 */
StatsArticleSchema.methods.addDetail = function (detail: IArticleDetail) {
  for (let _i = 0; _i < this.detail.length; _i++) {
    const element: IArticleDetail = this.articleDetail[_i];
    if (element.date == detail.date) { // dia de hoy con dia de enviado
      element.quantity = Number(element.quantity) + Number(detail.quantity);
      return;
    }
  }

  this.articleDetail.push(detail);
  // sendArticleValidation(this._id, detail.date).then();
  return;
};



/**
 * Trigger antes de guardar
 */
StatsArticleSchema.pre("save", function (this: IStatsArticle, next) {
  this.updated = new Date();

  next();
});

export let StatsArticle = model<IStatsArticle>("StatsArticle", StatsArticleSchema);
