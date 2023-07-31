import '../style/App.css';
import React, { useState, useEffect } from 'react';

import TopicQuestionComponent from "../components/TopicQuestionComponent"

function get_framework_by_id(id){
  const context = require.context('../constants', true, /.json$/);
  var chosen_framework = ""
  
  context.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    const resource = require(`../constants/${fileName}`);
    var _framework = JSON.parse(JSON.stringify(resource));
    if (_framework.id == id) {    
      chosen_framework = _framework
    }
  });
  return chosen_framework
}

function get_url_params(param_name){
  const params = new URLSearchParams(window.location.search)
  return params.get(param_name)
}

function collect_result(topic, score){
  console.log(score)
  console.log("adding " + score + " to topic " + topic.name);
}

export default function Question() {
  // https://blog.logrocket.com/using-react-usestate-object/
  const [framework, setFramework] = useState({});
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
        let frameworkid = get_url_params("framework_id")
        setFramework(get_framework_by_id(frameworkid))
        setIsLoaded(true)
  }, []);

  // You need to loop through topics then through questions in the topics
  // you only want to show one question at a time after reporting back the answer
  // know which one to go to next.
  return (
    <div style={{height: "200px"}}>
        <p>
          Questions
        </p>
        
        {isLoaded == true ? 
          framework.topics.map(function(d, idx){
              return (
                <TopicQuestionComponent 
                  key={idx} 
                  index={idx} 
                  topicIndex={currentTopicIndex} 
                  topic={d} 
                  callback={collect_result} 
                /> 
              )
          })
        : null}            

    </div>
  );
}
