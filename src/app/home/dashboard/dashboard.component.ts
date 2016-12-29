import { Component,OnInit }   from '@angular/core';
import { Router }   from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: []
})
export class DashboardComponent implements OnInit {

    public t: any;
    public i: number;
    public time = (new Date()).getTime();
    public data: any[] = [];
    public isStarted: boolean = false;

    constructor(public router: Router) {

    }
    ngOnInit():any {
        for (this.i = -6; this.i <= 0; this.i += 1) {
            this.data.push({
                time: this.time + this.i * 1000,
                velocity: Math.random(),
                pressure: Math.random(),
                temperature: Math.random()
            })
        }
    }
    toolbar = {
        dataSource: [
            {
                location: 'before',
                locateInMenu: 'never',
                widget: 'dxButton',
                options: {
                    icon: 'fa fa-refresh fa-lg',
                    text:'Refresh'
                }
            },
            {
                location: 'before',
                locateInMenu: 'never',
                widget: 'dxButton',
                options: {
                    icon: 'fa fa-play fa-lg',
                    text: 'Play',
                    onClick: function(e){
                        var dataArray = this.trend.dataSource;
                        var addPoint = function () {
                            if (this.i > 0) {
                                dataArray.shift();
                            }
                            dataArray.push({
                                time: this.time + this.i * 1000,
                                velocity: Math.random(),
                                pressure: Math.random(),
                                temperature: Math.random()
                            });

                            this.i = this.i + 1;
                        };
                        this.t = setInterval(addPoint, 1000);
                    }
                }
            },{
                location: 'before',
                locateInMenu: 'never',
                widget: 'dxButton',
                options: {
                    icon: 'fa fa-pause fa-lg',
                    text: 'Pause',
                    onClick: function(e){
                        clearInterval(this.t);
                    }
                }
            }]
    }
    trend = {
        dataSource : this.data,
        size: {
            height: 500,
            width: 800
        },
        commonSeriesSettings: {
            type: 'spline',
            argumentField: 'time',
            hoverMode: "allArgumentPoints",
            selectionMode: "allArgumentPoints",
            selectionStyle: {
                width: 7
            },
            label: {
                visible: false,
                format: {
                    type: "percent",
                    precision: 1
                }
            }
        },
        commonPaneSettings: {
            backgroundColor: 'rgb(255, 255, 255)',
            border: {
                visible: true,
                left: false,
                right: false,
                top: false,
                color: 'blue',
                dashStyle: 'longDash'
            }

        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 1,
            dashStyle:"dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }/*,
                 format: {
                 precision: 2
                 }*/
            }
        },
        series: [{
            valueField: 'velocity',
            name: 'Velocity',
            type: 'bar',
            color: '#ffa500',
            ignoreEmptyPoints: true,
        },
            {
                name: 'Pressure',
                argumentField: 'time',
                valueField: 'pressure'
            },
            {
                name: 'temperature',
                type: 'line',
                argumentField: 'time',
                valueField: 'temperature'
            }],
        argumentAxis: {
            argumentType: 'datetime',
            minorTickInterval: 'millisecond'

        },
        valueAxis: {
            constantLines: [{
                label: {
                    text: 'Low Average'
                },
                width: 2,
                value: 0.3,
                color: '#00ced1',
                dashStyle: 'dash'
            }, {
                label: {
                    text: 'High Average'
                },
                width: 2,
                value: 0.8,
                color: '#ff4500',
                dashStyle: 'dash'
            }]
        },
        /*        customizePoint() {
         if(this.value <= 0.3) {
         return { size: 8, symbol:'cross', visible: true };
         } else if(this.value <= 0.7) {
         return { size: 8, visible: true };
         } else if(this.value >= 0.8) {
         return { size: 8,symbol:'square', visible: true };
         }
         },*/
        /*        customizeLabel() {
         if (this.value > 0.9) {
         return {
         visible: true,
         backgroundColor: '#ff4500',
         customizeText: function () {
         return this.valueText + '&#176F'
         }
         }
         }
         },*/
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        title: "Live Trends",
        export: {
            enabled: true
        },
        animation: {
            duration: 2000,
            easing: 'linear',
            enabled: true,
            //maxPointCountSupported:100
        },
        tooltip: {
            enabled: true,
            shared: true,
            format: {
                type: "percent",
                precision: 1
            },
            zIndex: 99
            /*,
             customizeTooltip: function (point) {
             $log.info("customizeTooltip");
             $log.info(point);
             return {
             //text: point.argumentText
             text: point.valueText
             };
             }*/
        },
        pathModified: true,
        onPointClick(e) {


            e.target.select();

            alert("value => " + e.target.value);
        },
        onLegendClick(e) {
            var series = e.target;
            series.isVisible() ? series.hide() : series.show();
        },
        onSeriesClick(e) {
            var clickedSeries = e.target;
            clickedSeries.isSelected() ? clickedSeries.clearSelection() : clickedSeries.select();
        },
        onIncidentOccurred(info) {
            var incidentInfo = info.target;
            //DevExpress.ui.notify(incidentInfo.id + ': ' + incidentInfo.text);
        }
    }
    pieChart = {
        dataSource: [{
            type: "Salaries",
            val: 150000
        }, {
            type: "Bills",
            val: 50000
        }, {
            type: "Miscellaneous",
            val: 20000
        }, {
            type: "Investment",
            val: 20000
        }, {
            type: "Rent Expenditure",
            val: 50000
        }, {
            type: "Allowances",
            val: 60000
        }],
        title: "Expenses",
        tooltip: {
            enabled: true,
            format: {
                type: "millions",
                percentPrecision: 2
            },
            zIndex: 99
            /*,
            customizeTooltip: function (arg) {
                return {
                    text: arg.valueText + " - " + arg.percentText
                };
            }*/
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            margin: 0
        },
        "export": {
            enabled: true
        },
        animation: {
            duration: 2000,
            easing: 'linear',
            enabled: true,
            //maxPointCountSupported:100
        },
        size:{
            height: 500/*,
            width: 800*/
        },
        series: [{
            type: "doughnut",
            argumentField: "type",
            label: {
                visible: true,
                format: "decimal",
                connector: {
                    visible: true
                }
            }
        }],
        pathModified: true,
    }

}
