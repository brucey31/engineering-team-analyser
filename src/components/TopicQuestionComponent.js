import React, { useState } from 'react';
import '../style/App.css';
import QuestionComponent from './QuestionComponent';


export default function TopicQuestionComponent(props) {
  const [questionIndex, setQuestionIndex] = useState(0);

  function next_question(current_index){
    let next_question_index = current_index + 1
    if(next_question_index < props.topic.questions.length){
      setQuestionIndex(next_question_index)
    } 
    else{
      props.topic_callback(props.topicIndex)
    }
  }
  
  if(props.topicIndex === props.index){
    return (
      <div>
        
        <h1>{props.topic.name}</h1>
        {
          props.topic.questions.map(function(d, idx){
            return (
              <QuestionComponent
                key={idx}
                index={idx}
                topic={props.topic.name}
                questionIndex={questionIndex}
                answers={d.answers}
                text={d.text}
                name={props.name}
                framework_id={props.framework_id}
                score_callback={props.score_callback}
                question_callback={next_question}
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
