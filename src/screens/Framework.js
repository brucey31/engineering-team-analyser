import React, { useState, useEffect } from 'react';

import FrameworkSelectionBox from "../components/FrameworkSelectionBox"

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
    const [frameworks, setFrameworks] = useState([]);

    useEffect(() => {
        get_frameworks(setFrameworks)
    }, []);

  return (
    <div>
      {
        frameworks.map(function(d, idx){
            return (
                <FrameworkSelectionBox framework_name={d.name} />
            )
        })
       }

    </div>
  );
}
