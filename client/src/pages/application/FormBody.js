import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect} from '../../components/questions/forms';


function FormBody({data, values}) {
  const [formElements, setFormElements] = useState([]);
  useEffect(() => {
    console.log(values)
    const formElementList = []
    for (let i = 0; i < data.length; i++) {
      let section = data[i];
      formElementList.push(<h1 key={section.name}>{section.name}</h1>);

      for (let y = 0; y < section.questions.length; y++) {
        let question = section.questions[y];
        switch (question.type) {

          case "Input Text":
          formElementList.push(<InputText key={question._id} name={question._id} label={question.text} hint={question.hint}/>);
            break;

          case "Multiple Select":
          formElementList.push(<Checkbox key={question._id} name={question._id} label={question.text} options={question.options} />);
           break;

          case "Email":
            formElementList.push(<Email key={question._id} name={question._id} label={question.text} />)
            break;
          case "Single Select":
            formElementList.push(<SingleSelect key={question._id} name={question._id} label={question.text} options={question.options} />);
            break;
        }
      }
    }
    setFormElements(formElementList)
  }, [])

  return (
    <div>
    {formElements}
    </div>
  )
}

export default FormBody;
