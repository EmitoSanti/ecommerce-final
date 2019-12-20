import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';

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

export interface Stat {
    labels: [string], // January, February, March,April, May
    datasets: [{
        label: string,
        data: [number]
        }
    ]
}

export interface StatHistory {
    title: string,
    labels: [string],
    datasets: [{
        label: string,
        data: [number]
        }
    ]
}

export interface Options {
    color: [
        "red",
        "blue",
        "green",
        "black"
    ]
}

export interface Graf {
    type: "bar";
    data: Stat;
    options: Options;
}

@Injectable()
export class StatsService extends RestBaseService {
    constructor(private http: Http) {
        super();
    }

    getStat(query: StatQuery): Promise<Stat> {
        const encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
        const result = Object.keys(query).map((key:string) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');
        const params = query;
        console.log("getStat");
        console.log("Encondeo" + encodeGetParams(params))
        return this.http
            .get(environment.statsServerUrl + 'stats/?' +  encodeGetParams(params), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Stat;
            })
            .catch(this.handleError);
    }

    getStatsHistory(): Promise<StatHistory> {
        console.log("getStatsHistory");
        return this.http
            .get(environment.statsServerUrl + 'stats/history', this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as StatHistory;
            })
            .catch(this.handleError);
    }

    saveStat(stat: any): Promise<void> {
        console.log("saveStat Service: " + JSON.stringify(stat));
        return this.http
            .post(
                environment.statsServerUrl + 'stats/createhistory',
                stat,
                this.getRestHeader()
            )
            .toPromise()
            .then(response => null)
            .catch(this.handleError);
    }
}