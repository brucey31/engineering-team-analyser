import '../style/App.css';

import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value} xxx`;
}

export default function Question() {

  return (
    <div style={{height: "200px"}}>
        <p>
          Questions
        </p>

        <Slider
          defaultValue={2}
          valueLabelFormat={value => valuetext(value)}
          aria-hidden="false"
          valueLabelDisplay="on"
          step={1}
          min={1}
          max={5}
          marks
        />

    </div>
  );
}
