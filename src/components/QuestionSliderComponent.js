import '../style/App.css';

import Slider from '@mui/material/Slider';

function valuetext(index, answers, effectFunction) {
  if(index -1 > answers.length){
    return "N/A"
  }
  else{
    effectFunction(index)
    return answers[index-1].text
  }
}

export default function QuestionSliderComponent(props) {    
  return (
    <div class="slider_container">
      <Slider
          defaultValue={props.starting_point}
          valueLabelFormat={value => valuetext(value, props.answers, props.effectFunction)}
          aria-hidden="false"
          valueLabelDisplay="on"
          step={1}
          min={1}
          max={props.answers.length}
          marks={true}
          sx={{
            color: "rgba(101, 224, 200, 0.5)",
            '& .MuiSlider-thumb': {
              color: "rgba(101, 224, 200, 1)",
            },
          }}
      />
    </div>
  );
}
