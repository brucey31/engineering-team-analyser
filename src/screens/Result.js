import '../style/App.css';
import React, { useState, useEffect } from 'react';

import RadarChartComponent from '../components/RadarChartComponent';
import LevelSuggestedionsImprovementsComponent from "../components/LevelSuggestionsImprovementsComponent"

import {get_url_params} from "../controllers/FrameworkController"
import {get_results_for_framework, get_green_red_results} from "../controllers/ResultsController"

const chart_colours = [
  ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)'],
  ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)'],
  ['rgba(88, 129, 87, 0.2)', 'rgba(88, 129, 87, 1)'],
  ['rgba(242, 187, 5, 0.2)', 'rgba(242, 187, 5, 1)'],
  ['rgba(9, 4, 70, 0.2)', 'rgba(9, 4, 70, 1)'],
  ['rgba(115, 29, 216, 0.2)', 'rgba(115, 29, 216, 1)']
]

const dataset_template = {   
  label: "",
  data: [],
  fill: true,
  backgroundColor: "",
  borderColor: "",
  borderWidth: 1,
  lineTension: 0.9
};

export default function Result() {
  const [chartResults, setChartResults] = useState({"labels": [], datasets:[]});
  const [greenRedResults, setGreenRedResults] = useState({});

  useEffect(() => {
    let frameworkid = get_url_params("framework_id")
    let name = get_url_params("name")
    
    get_green_red_results(name, frameworkid, setGreenRedResults)
    get_results_for_framework(dataset_template, chart_colours, frameworkid, setChartResults)
  }, []);

  return (
    <div className="results_container">
        <div className="results_sub_container"> 
          <RadarChartComponent chart_data={chartResults} />
        </div>
        <div className="results_sub_container">
          <LevelSuggestedionsImprovementsComponent results={greenRedResults} />
        </div>
    </div>
  );
}
