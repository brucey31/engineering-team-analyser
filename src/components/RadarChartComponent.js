import '../style/App.css';
import React from 'react';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

export default function RadarChartComponent(props) {

    const options = {
        responsive: true,
        maintainAspectRatio:false,
        title: "Engineering Framework Resu",
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 5
            }
        },
        scale: {
            ticks:{
                stepSize: 1
            },
            gridLines: {
                circular: false
            }
            }
    };

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
        );

    if (props.chart_data != null){
        return <Radar data={props.chart_data} options={options} />
    }
    else{
        return null
    }
}    