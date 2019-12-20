"use strict";

import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface IStatsHistory extends Document {
    title: string;
    labels: [string];
    datasets: [{
        label: string,
        data: [number]
        }
    ];
    created: Date;
    updated: Date;
    enabled: Boolean;
}

/**
 * Esquema Stats History
 */
const StatsHistorySchema = new Schema({
  title: {
    type: String,
    required: "La estadistica debe tener titulo"
  },
  labels: {
    type: [
      {
        type: String,
      }
    ]
  },
  datasets: [{
    label: {
        type: String,
        required: "Datasets Label requerido"
    },
    data: {
        type: [
            {
              type: String,
            }
        ]
    }
  }],
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "statshistory" });


StatsHistorySchema.index({ statId: 1, enabled: -1 });

/**
 * Trigger antes de guardar
 */
StatsHistorySchema.pre("save", function (this: IStatsHistory, next) {
  this.updated = new Date();
  next();
});

export let StatsHistory = model<IStatsHistory>("StatsHistory", StatsHistorySchema);
