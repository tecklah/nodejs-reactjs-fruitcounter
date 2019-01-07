import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fruits : {},
            chart : {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Pie Chart of Fruits'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Fruit',
                    colorByPoint: true,
                    data: [{
                        name: 'Chrome',
                        y: 61.41
                    }, {
                        name: 'Internet Explorer',
                        y: 11.84
                    }, {
                        name: 'Firefox',
                        y: 10.85
                    }, {
                        name: 'Edge',
                        y: 4.67
                    }, {
                        name: 'Safari',
                        y: 4.18
                    }, {
                        name: 'Sogou Explorer',
                        y: 1.64
                    }, {
                        name: 'Opera',
                        y: 1.6
                    }, {
                        name: 'QQ',
                        y: 1.2
                    }, {
                        name: 'Other',
                        y: 2.61
                    }]
                }]
            }
        };
    }
    
    render() {

        const fruits = this.state.fruits;

        const listOfFruits = Object.keys(fruits).map(function (key, value) {
            return (
                <li key={key}>{key} {fruits[key]}</li>
            );
        });

        // <ol>{listOfFruits}</ol>
        return (
            <div>
                <div>
                    <HighchartsReact highcharts={ Highcharts } options={ this.state.chart } />
                </div>
            </div>
        );
    }

    fetchData() {

        fetch('http://localhost:9001/data')
        .then(response => {
            if (response.ok && response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to retrieve data.');
            }
        })
        .then(fruitJson => {

            var series = [];
            for (var key in fruitJson) {
                series.push({ 
                    name: key,
                    y: fruitJson[key]
                });
            }
    
            var newState = Object.assign({}, this.state.chart, {
                fruits : fruitJson,
                chart : {
                    series : [{
                        name: 'Fruit',
                        colorByPoint: true,
                        data:series }]
                }
            });
    
            this.setState(newState);

        })
        .catch(error => console.log(error));
    }

    componentWillMount() {
        this.interval = setInterval(() => this.fetchData(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default Chart;