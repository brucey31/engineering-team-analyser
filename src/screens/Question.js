import '../style/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import TopicQuestionComponent from "../components/TopicQuestionComponent"

/**
 * Searches through all of the framework jsons files to extract the correct framework object
 * @param  {String} id The querystring parameter key to return 
 * @return {Object} The matching framework object
 */
function get_framework_by_id(id){
  const context = require.context('../constants', true, /.json$/);
  var chosen_framework = ""
  
  context.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    const resource = require(`../constants/${fileName}`);
    var _framework = JSON.parse(JSON.stringify(resource));
    if (_framework.id === id) {    
      chosen_framework = _framework
    }
  });
  return chosen_framework
}

/**
 * Extracts a piece of data from a URL string 
 * @param  {String} param_name The querystring parameter key to return 
 * @return {String} The value matching the key supplied to the function  
 */
function get_url_params(param_name){
  const params = new URLSearchParams(window.location.search)
  return params.get(param_name)
}

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
   * Adds, ammends & persists framework answer data to 
   * @param  {String} topic The topic being added to
   * @param  {Integer} score The score to be added to the tally.
   * @return {null}     
   */
  function collect_result(topic, score){
    let framework_results = JSON.parse(localStorage.getItem("framework_results"))
    var new_results = []
    let new_record = {
      "name": name, 
      "framework_id": frameworkID,
      "topics": [
          {
            "topic_name": topic,
            "score": score
          }
        ]
      }
    // Nothing at all saved yet
    if(framework_results == null){
      new_results.push(new_record)
    }
    // Appending to existing results
    else{
      var testee_found = false
      for (let i = 0; i < framework_results.length; i++) {
        let result = framework_results[i]
        // existing testee name found
        if (result.name === name){
          testee_found = true
          var topic_already_exists = false
          for (let j = 0; j < result.topics.length; j++) {
            // Adding score to already existing topic
            if (result.topics[j].topic_name === topic){
              console.log("Adding score to already existing topic")
              topic_already_exists = true
              result.topics[j].score += score
            }
          }
          // Creating new topic within testee name
          if(topic_already_exists === false){
            result.topics.push(
              {
                "topic_name": topic,
                "score": score
              }
            )
          }
          new_results.push(result)
        }
        // wrong testee, appending unchanged results
        else{
          new_results.push(result)
        }
      }
      // Existing results but new testee
      if(testee_found === false){
        new_results.push(new_record)
      }
    }

    localStorage.setItem("framework_results", JSON.stringify(new_results));
  }

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
                  score_callback={collect_result}
                  topic_callback={next_topic}
                /> 
              )
          })
        : null}            

    </div>
  );
}
