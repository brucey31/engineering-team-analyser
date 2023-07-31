import React, { useState, useEffect } from 'react';
import '../style/App.css';
import QuestionComponent from './QuestionComponent';


export default function TopicQuestionComponent(props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  
  if(props.topicIndex == props.index){
    return (
      <div>
        
        <p>{props.topic.name}</p>
        {
          props.topic.questions.map(function(d, idx){
            return (
              <QuestionComponent
                key={idx}
                index={idx}
                topic={props.topic}
                currentQuestionIndex={questionIndex}
                answers={d.answers}
                text={d.text}
                callback={props.callback}
              />
            )
          })
        }

      </div>
    );
  }
  else{
    return null
  }
  
}
