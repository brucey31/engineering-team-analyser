import '../style/App.css';
import ButtonComponent from "./ButtonComponent"

export default function FrameworkSelectionBox(props) {    

  function on_click(){
    props.framework_selection_callback(props.framework_id, props.entered_name)
  }

  return (
    <div className="button_selector">
      <ButtonComponent
        onClick={on_click}
        text={props.framework_name}
      />
    </div>
  );
}
