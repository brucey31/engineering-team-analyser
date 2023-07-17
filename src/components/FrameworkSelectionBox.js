import React, { useState, useEffect } from 'react';
import '../style/App.css';

export default function FrameworkSelectionBox(props) {    


  return (
    <div>
        <h1 style={{color: "blue", fontSize: "12px"}}>
            <a href={"/questions?" + props.framework_name }>
                {props.framework_name}
            </a>
        </h1>
    </div>
  );
}
