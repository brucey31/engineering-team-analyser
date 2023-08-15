import React from 'react';
import '../style/App.css';


export default function LevelSuggestedionsImprovementsComponent(props) {
  
  if(props.results !== {} & props.results.strength_topics !== undefined){
    return (
        <div className="level_suggestions_container">
            <h2>{props.results.name}, your current level is:</h2>
            <h3>{props.results.current_level}</h3>
            {
                props.results.strength_topics.length > 0 ? <h4>Places you are doing well</h4> : null
            }
            <ul>
                {
                    props.results.strength_topics.map(function(d, idx){
                        return <li key={idx}>{d}</li>
                    })
                }
            </ul>
            {
                props.results.improvement_topics.length > 0 ? <h4>Places to improve</h4> : null
            }
            <ul>
                {
                    props.results.improvement_topics.map(function(d, idx){
                        return <li key={idx}>{d}</li>
                    })
                }
            </ul>
        </div>
    );
  }
  else{
    return null
  }
  
}
