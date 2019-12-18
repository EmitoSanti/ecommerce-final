"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface IUserDetail {
    action: string;
    time: Date;
}

export interface IStatsUser extends Document {
    userId: string;
    name: string;
    userDetail: IUserDetail[];
    updated: Date;
    created: Date;
    enabled: Boolean;
    addDetail: Function;
}

/**
 * Esquema del user stat
 */
const StatsUserSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    default: "",
    required: "El userId debe existir en auth"
  },
  name: {
    type: String,
    trim: true,
    default: "",
    required: "El nombre de usuario es requerido"
  },
  userDetail: [{
    action: {
      type: String,
      required: "Accion ejecutada relacionado al usuario",
      trim: true
    },
    time: {
        type: Date,
        default: Date.now()
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
}, { collection: "statsuser" });

StatsUserSchema.index({ userId: 1, enabled: -1 });


/**
 * Agrega un articulo al carrito
 */
StatsUserSchema.methods.addDetail = function (detail: IUserDetail) {
  this.userDetail.push(detail);
  return;
};

/**
 * Trigger antes de guardar
 */
StatsUserSchema.pre("save", function (this: IStatsUser, next) {
  this.updated = new Date();
  next();
});

export let StatsUser = model<IStatsUser>("StatsUser", StatsUserSchema);
