import '../style/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import TopicQuestionComponent from "../components/TopicQuestionComponent"

import {get_framework_by_id, get_url_params} from "../controllers/FrameworkController"
import {collect_result} from "../controllers/ResultsController"

export default function Question() {
  const navigate = useNavigate();

  // https://blog.logrocket.com/using-react-usestate-object/
  const [framework, setFramework] = useState({});
  const [frameworkID, setFrameworkID] = useState({});
  const [name, setName] = useState("");
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
        let frameworkid = get_url_params("framework_id")
        setFramework(get_framework_by_id(frameworkid))
        setName(get_url_params("name"))
        setFrameworkID(frameworkid)
        setIsLoaded(true)
  }, []);



  /**
   * Moves to the next topic or to results page if framework is finished
   * @param  {Integer} current_index The current topic index to feed into the logic.
   * @return {null}     
   */
  function next_topic(current_index){
    let next_topic_index = current_index + 1
    
    if(next_topic_index < framework.topics.length){
      setCurrentTopicIndex(next_topic_index)
    }
    else{
      let redirect_url = "/results?name=" + name + "&framework_id=" + frameworkID;
      navigate(redirect_url)
    }
  }

  return (
    <div style={{height: "200px"}}>
        <p>
          Questions
        </p>
        
        {isLoaded === true ? 
          framework.topics.map(function(d, idx){
              return (
                <TopicQuestionComponent 
                  key={idx} 
                  index={idx} 
                  topicIndex={currentTopicIndex} 
                  topic={d} 
                  name={name}
                  framework_id={frameworkID}
                  score_callback={collect_result}
                  topic_callback={next_topic}
                  
                /> 
              )
          })
        : null}            

    </div>
  );
}
