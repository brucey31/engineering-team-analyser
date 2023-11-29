import React, { useState } from 'react';
import '../style/App.css';

import Slider from '@mui/material/Slider';
import QuestionSliderInfoBoxComponent from "./QuestionSliderInfoBox"

function valuetext(index, answers, parentEffectFunction, effectFunction) {
  if(index -1 > answers.length){
    return "N/A"
  }
  else{
    parentEffectFunction(index)
    effectFunction(answers[index-1].text)
    return index
  }
}

export default function QuestionSliderComponent(props) {  
  const [helpText, setHelpText] = useState(null);
  
  return (
    <div className="slider_container">
      <Slider
          defaultValue={props.starting_point}
          valueLabelFormat={value => valuetext(value, props.answers, props.effectFunction, setHelpText)}
          aria-hidden="false"
          valueLabelDisplay="on"
          step={1}
          min={1}
          max={props.answers.length}
          marks={true}
          sx={{
            color: "rgba(0, 142, 250, 0.5)",
            '& .MuiSlider-thumb': {
              color: "rgba(0, 142, 250, 1)",
            },
          }}
      />
      <QuestionSliderInfoBoxComponent info_text={helpText} />
    </div>
  );
}
