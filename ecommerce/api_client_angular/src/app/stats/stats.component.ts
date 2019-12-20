import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stat, StatQuery, StatsService } from './stats.service';
import { BasicFromGroupController } from '../tools/error.form';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['stats.component.css'],
})
export class StatsComponent extends BasicFromGroupController implements OnInit {


    @Input()
    chart = [];
    query: StatQuery;
    
    isSave: boolean = true;
    constructor(private statService: StatsService, private router: Router) {
        super();
    }

    ngOnInit(): void {
        //this.refresh();
    }

    collections: string[] = ['usuarios', 'carritos', 'articulos'];
    porID: boolean;
    typeTimes: string[] = ['horas', 'minutos'];
    accions: string[] = ['login', 'logout'];
    countObjs: number[] = [1, 5, 10, 20];
    selectedMoments = [];

    collectionValue: string = "usuarios";
    typeTimeValue: string = "minutos";
    accionValue: string = "login";
    countObjValue: number = 1;
    timeStart: string;
    timeEnd: string;
    forSaveStat: any = {};

    runGraf() {
        if (this.typeTimeValue === "minutos") {
            this.timeStart = JSON.stringify(this.selectedMoments[0]);
            this.timeEnd = JSON.stringify(this.selectedMoments[1]);
        }
        console.log("timeStart: "+ this.timeStart);
        console.log("timeEnd: "+ this.timeEnd);

        this.query =  {
            objId: this.porID || undefined,
            collection: this.collectionValue || undefined,
            typeTime: this.typeTimeValue || undefined,
            accion: this.accionValue || undefined,
            countObj: this.countObjValue || undefined,
            created: this.timeStart || undefined,
            timeEnd: this.timeEnd || undefined,
            enabled: true
        }

        console.log("this.query: "+ JSON.stringify(this.query));
        this.statService.getStat(this.query)
            .then(stat => {
                this.forSaveStat = JSON.stringify(stat);
                console.log("this.forSaveStat: " + JSON.stringify(this.forSaveStat));
                this.renderGraf(stat);
            })
            .catch(err => this.processRestValidations(err));
    }

    renderGraf(stat: Stat) {
        console.log("renderGraf: " + JSON.stringify(stat));
        this.isSave = false;
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: stat.labels,
                datasets: stat.datasets
            }
        });
    }

    saveStat() {
        console.log("saveStat() " + JSON.stringify(this.forSaveStat));
        this.statService.saveStat(this.forSaveStat)
            .then()
            .catch(err => this.processRestValidations(err));        
    }
}
