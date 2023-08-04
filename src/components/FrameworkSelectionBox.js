import Button from '@mui/material/Button';
import '../style/App.css';

export default function FrameworkSelectionBox(props) {    
  return (
    <div className="button_selector">
      <Button 
        variant="contained"
        onClick={() => {
            props.framework_selection_callback(props.framework_id, props.entered_name)
          }}
      >
        {props.framework_name}
      </Button>
    </div>
  );
}
