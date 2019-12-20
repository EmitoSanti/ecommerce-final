import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stat, StatQuery, StatsService } from './stats.service';
import { BasicFromGroupController } from '../tools/error.form';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-stats-history',
    templateUrl: './stats.history.component.html',
    styleUrls: ['stats.component.css'],
})
export class StatsHistoryComponent extends BasicFromGroupController implements OnInit {


    @Input()
    chart = [];
    statsHistory: any = [];

    constructor(private statService: StatsService, private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.getHistory();
    }

    getHistory() {
        console.log("getHistory");
        this.statService.getStatsHistory()
            .then(statsHistory => {
                console.log("statsHistory: " + JSON.stringify(statsHistory));
                this.statsHistory = statsHistory;
            })
            .catch(err => this.processRestValidations(err));
    }

    renderGraf(stat: Stat) {
        console.log("renderGraf: " + JSON.stringify(stat));
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: stat.labels,
                datasets: stat.datasets
            }
        });
    }
}
