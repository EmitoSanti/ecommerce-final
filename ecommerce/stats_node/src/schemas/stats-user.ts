"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface IStatsUsers extends Document {
  typeTime: string;
  accionUser: string;
  countUser: number;
  created: string;
  updated: Date;
  enabled: Boolean;
  addQuantity: Function;
}

/**
 * Esquema Stats User
 */
const StatsUserSchema = new Schema({
  typeTime: {
    type: String,
    trim: true,
    default: "",
    required: "El tipo de tiempo debe existir"
  },
  accionUser: {
    type: String,
    trim: true,
    default: "",
    required: "El tipo de accion debe existir"
  },
  countUser: {
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
}, { collection: "statsuser" });

StatsUserSchema.index({ userId: 1, enabled: -1 });


/**
 * Contador de usuario para el registro correspondiente suma en 1
 */
StatsUserSchema.methods.addQuantity = function () {
  console.log("viejo countUser: " + this.countUser);
  this.countUser++;
  console.log("nuevo countUser: " + this.countUser);
};

/**
 * Trigger antes de guardar
 */
StatsUserSchema.pre("save", function (this: IStatsUsers, next) {
  this.updated = new Date();
  next();
});

export let StatsUser = model<IStatsUsers>("StatsUser", StatsUserSchema);
