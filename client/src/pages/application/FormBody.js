import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea} from '../../components/questions/forms';
import {ErrorMessage} from 'formik';

function Section(props) {
  const { section, errors } = props;
  const [ allSectionElements, setAllSectionElements ] = useState([<h1 key={section.name}>{section.name}</h1>]);
  const [ repeat, setRepeat ] = useState(1);

  useEffect(() => {
    const sectionBody = getSectionElements();
    setAllSectionElements([...allSectionElements, ...sectionBody]);
  }, [repeat])

  const getSectionElements = () => {
    const sectionBody = [];
    for (let y = 0; y < section.questions.length; y++) {
      let question = section.questions[y];
      switch (question.type) {
        case "Input Text":
        sectionBody.push(<InputText key={question._id + repeat} name={question._id + repeat} label={question.text} hint={question.hint} errors={errors}/>);
          break;
        
        case "Name":
        sectionBody.push(<InputText key={question._id + repeat} name={question._id + repeat} label={question.text} hint={question.hint} errors={errors}/>);
            break;

        case "Multiple Select":
        sectionBody.push(<Checkbox key={question._id + repeat} name={question._id + repeat} label={question.text} options={question.options} />);
          break;

        case "Email":
          sectionBody.push(<Email key={question._id + repeat} name={question._id + repeat} label={question.text} />)
          break;

        case "Single Select":
          sectionBody.push(<SingleSelect key={question._id + repeat} name={question._id + repeat} label={question.text} options={question.options} />);
          break;

        case "Dropdown":
          sectionBody.push(<Dropdown key={question._id + repeat} name={question._id + repeat} label={question.text} options={question.options} />);
          break;

        case "Paragraph":
          sectionBody.push(<TextArea key={question._id + repeat} name={question._id + repeat} label={question.text} options={question.options} />);
          break;
      }
    }
    return sectionBody;
  }


  const repeatSection = () => {
    if (repeat < section.repeatable) {
      setRepeat(repeat + 1);
    }
  }

  return (
    <div>
      {allSectionElements}
      {
        section.repeatable > 0 && <button type="button" onClick={() => repeatSection()}>Add More</button>
      }
    </div>
  )
}

function FormBody({data, values, errors}) {
  const [formElements, setFormElements] = useState([]);
  useEffect(() => {
    const formElementList = []
    for (let i = 0; i < data.length; i++) {
      formElementList.push(<Section key={i} section={data[i]} errors={errors}></Section>)
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
