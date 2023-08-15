import React, { useState } from 'react';
import '../style/App.css';

import QuestionSliderComponent from "./QuestionSliderComponent"
import ButtonComponent from './ButtonComponent';


export default function QuestionComponent(props) { 
    const starting_point = 1
    const [questionValue, setQuestionValue] = useState(starting_point);

    function button_press(){
      props.score_callback(props.topic, questionValue, props.name, props.framework_id)
      props.question_callback(props.questionIndex)
    }
    
    if (props.questionIndex === props.index){
        return (
            <div>
              <h3>{props.text}</h3>
              <QuestionSliderComponent
                starting_point={starting_point}
                answers={props.answers}
                effectFunction={setQuestionValue}
              />
              <ButtonComponent
                onClick={button_press}
                text={"Choose"}
              />
            </div>
          );  
    }
    else{
        return null
    }
    
}
