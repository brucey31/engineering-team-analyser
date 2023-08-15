import '../style/App.css';

export default function QuestionSliderInfoBoxComponent(props) {    
    if(props.info_text != null){
        return (
            <div className="question_info_text_container">
                {
                    props.info_text.split(".").map(function(line, idx){
                        if (idx < props.info_text.split(".").length -1){
                            return (
                                <p className="question-info-text" key={line}>
                                    {idx + 1}) {line}.
                                </p>)
                        }
                        else{
                            return null
                        }
                    })
                }
                
            </div>
        );
    }
    else{
        return null
    }
}
