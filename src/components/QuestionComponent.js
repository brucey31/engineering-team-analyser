import React, { useState } from 'react';
import '../style/App.css';

import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

function valuetext(index, answers, effectFunction) {
  if(index -1 > answers.length){
    return "N/A"
  }
  else{
    effectFunction(index)
    return answers[index-1].text
  }
}

export default function QuestionComponent(props) { 
    const starting_point = 2
    const [questionValue, setQuestionValue] = useState(starting_point);

    function button_press(){
      props.score_callback(props.topic, questionValue)
      props.question_callback(props.questionIndex)
    }
    
    if (props.questionIndex === props.index){
        return (
            <div>
              <p>{props.text}</p>
              <Slider
                defaultValue={starting_point}
                valueLabelFormat={value => valuetext(value, props.answers, setQuestionValue)}
                aria-hidden="false"
                valueLabelDisplay="on"
                step={1}
                min={1}
                max={props.answers.length}
                marks
              />
              <Button 
                variant="contained"
                onClick={() => {
                  button_press()
                  }}
              >
                Choose
              </Button>
            </div>
          );  
    }
    else{
        return null
    }
    
}
