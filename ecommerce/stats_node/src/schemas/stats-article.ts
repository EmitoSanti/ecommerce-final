"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface IStatsArticles extends Document {
  articleId: string;
  typeTime: string;
  countArticle: number;
  created: string;
  updated: Date;
  enabled: Boolean;
  addQuantity: Function;
}

/**
 * Esquema Stats Article
 */
const StatsArticleSchema = new Schema({
  articleId: {
    type: String,
    trim: true,
    default: "",
    required: "El id del algun articulo debe existir"
  },
  typeTime: {
    type: String,
    trim: true,
    default: "",
    required: "El tipo de tiempo debe existir"
  },
  countArticle: {
    type: Number,
    default: 1
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
}, { collection: "statsarticle" });

StatsArticleSchema.index({ articleId: 1, enabled: -1 });

/**
 * Contador de articulo para el registro correspondiente suma en 1
 */
StatsArticleSchema.methods.addQuantity = function () {
  console.log("viejo countUser: " + this.countArticle);
    this.countArticle++;
  console.log("nuevo countUser: " + this.countArticle);
};

/**
 * Trigger antes de guardar
 */
StatsArticleSchema.pre("save", function (this: IStatsArticles, next) {
  this.updated = new Date();
  next();
});

export let StatsArticle = model<IStatsArticles>("StatsArticle", StatsArticleSchema);
