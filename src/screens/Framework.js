import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import FrameworkSelectionBox from "../components/FrameworkSelectionBox"
import TextField from '@mui/material/TextField';
import '../style/App.css';

function get_frameworks(effectFunction){
    const context = require.context('../constants', true, /.json$/);
    const all = [];
    context.keys().forEach((key) => {
        const fileName = key.replace('./', '');
        const resource = require(`../constants/${fileName}`);
        all.push(JSON.parse(JSON.stringify(resource)));
    
    });
    effectFunction(all)
}

export default function Frameworks() {
    const navigate = useNavigate();
    const [frameworks, setFrameworks] = useState([]);
    const [enteredName, setEnteredName] = useState([]);

    useEffect(() => {
        get_frameworks(setFrameworks)
    }, []);

    function ButtonCallback(framework_id, entered_name){
      if (entered_name.length <= 2){
        alert("Please enter value for team member name")
      }
      else{
        let redirect_url = "/questions?framework_id=" + framework_id + "&name=" + entered_name
        navigate(redirect_url)
      }
    }

  return (
    <div>
      <TextField 
        required
        id="name_text" 
        label="Team member name"
        variant="outlined" 
        helperText="The name of the person being assessed"
        onChange={(value) =>{setEnteredName(value.target.value)}}
      />
      {
        frameworks.map(function(d, idx){
            return (
                <FrameworkSelectionBox 
                  framework_name={d.name} 
                  framework_id={d.id} 
                  entered_name={enteredName}
                  framework_selection_callback={ButtonCallback}
                />
            )
        })
       }

    </div>
  );
}
