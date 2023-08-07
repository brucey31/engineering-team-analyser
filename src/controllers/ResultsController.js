import {get_framework_by_id} from "./FrameworkController"

/**
 * Adds, ammends & persists framework answer data to 
 * @param  {String} topic The topic being added to
 * @param  {Integer} score The score to be added to the tally.
 * @param  {String} name The name of the questionee
 * @param  {String} framework_id The framework_id to chart results for
 * @return {null}     
 */
export function collect_result(topic, score, name, framework_id){
    let framework_results = JSON.parse(localStorage.getItem("framework_results"))
    var new_results = []
    let new_record = {
      "name": name, 
      "framework_id": framework_id,
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
 * Takes the results from local storage for formats them for the chart
 * @param  {Object} dataset_template The template to base each chart object on
 * @param  {Object} chart_colours A list of colours to loop each result through to get different colours per questionee in the chart
 * @param  {String} framework_id The framework_id to chart results for
 * @param  {Function} effectFunction The state function to use for setting the final results.
 * @return {null} 
 */
export function get_results_for_framework(dataset_template, chart_colours, framework_id, effectFunction){
    var chart_data = {"labels": [], datasets: []}
    let framework_results = JSON.parse(localStorage.getItem("framework_results"))
    
    // For each user's results
    for (let i = 0; i < framework_results.length; i++) {
      let result = framework_results[i]
      // If the results are for the right framework
      if (result.framework_id === framework_id){
        // taking a deep clone of object - https://stackoverflow.com/a/122704
        var new_dataset = JSON.parse(JSON.stringify(dataset_template));
        new_dataset.label = result.name
        new_dataset.backgroundColor = chart_colours[i][0]
        new_dataset.borderColor = chart_colours[i][1]
        for (let t = 0; t < result.topics.length; t++){
          let topic = result.topics[t]
          // Only add labels for the first framework result.
          if (i === 0){
            chart_data.labels.push(topic.topic_name)
          }
          new_dataset.data.push(topic.score)
        }
        chart_data.datasets.push(new_dataset)
      }
    }
    effectFunction(chart_data)
  };

/**
 * Generates the current skill level strengths & improvements needed
 * @param  {String} name The questionee's name
 * @param  {String} framework_id The framework_id to chart results for
 * @param  {Function} effectFunction The state function to use for setting the final results.
 * @return {null} 
 */
export function get_green_red_results(name, framework_id, effectFunction){
    let framework = get_framework_by_id(framework_id)
    let framework_results = JSON.parse(localStorage.getItem("framework_results"))
    // For each user's results
    for (let i = 0; i < framework_results.length; i++) {
      let result = framework_results[i]
      // Name matches who the page was made for
      if (result.name === name){
        var score_sum = 0
        var mean = 0
        var current_level = ""
        var green_topics = []
        var red_topics = []
        // Looping through to create the total score
        for (let j = 0; j < result.topics.length; j++){
          var count = j
          score_sum += result.topics[j].score
        }
        mean = Math.floor(score_sum/(count + 1));
        // Get current level from framework
        for (let s = 0; s < framework.levels.length; s++){
          if (framework.levels[s].mean_score === mean){
            current_level = framework.levels[s].level_name
          }
        }
        // Looping through to get green & red topics
        for (let gr = 0; gr < result.topics.length; gr++ ){
          if(result.topics[gr].score < mean){
            red_topics.push(result.topics[gr].topic_name)
          }
          else if(result.topics[gr].score > mean){
            green_topics.push(result.topics[gr].topic_name)
          }
        }
        let final_result = {
          "name": name,
          "current_level": current_level, 
          "improvement_topics": red_topics, 
          "strength_topics": green_topics
        };
        effectFunction(final_result)
      }
    }
  };