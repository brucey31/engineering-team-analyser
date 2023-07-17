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



export const data = {
  labels: ['Testing', 'CS Knowledge', 'Speed', 'Pairing', 'Architecture'],
  datasets: [
    {   
        label: "me",
        data: [8, 9, 3, 5, 2],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        lineTension: 0.9,
    },
    {
        label: "you",
        data: [7, 3, 4, 5, 8],
        fill: true,
        backgroundColor: 'rgba(255, 105, 132, 0.4)',
        borderColor: 'rgba(150, 99, 132, 1)',
        borderWidth: 1,
        lineTension: 0.9,
        },
  ],
};

const options = {
    responsive: true,
    maintainAspectRatio: true,
    title: "This chart rocks",
    layout: {
      beginAtZero: false,
    },
    scale: {
        gridLines: {
          circular: true
        }
      }
  };


export default function Result() {

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
    );

  return (
    <div >
         return <Radar data={data} options={options} />
    </div>
  );
}
