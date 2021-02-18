import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea} from '../../components/questions/forms';
import {ErrorMessage, FieldArray} from 'formik';

function Section(props) {
  const { section, errors } = props;
  const [ allSectionElements, setAllSectionElements ] = useState([<h1 key={section.name}>{section.name}</h1>]);
  const [ repeat, setRepeat ] = useState(0);

  useEffect(() => {
    const sectionBody = getSectionElements();
    setRepeat(repeat + 1);
    setAllSectionElements([...allSectionElements, sectionBody]);
  }, [])

  const removeSection = (index) => {
    // can't use index
    if (repeat >= 1) {
      const newSectionElements = [...allSectionElements];
      newSectionElements.splice(index + 1, 1);
      console.log('newSectionElements :>> ', newSectionElements);
      console.log('repeat :>> ', repeat);
      setRepeat(repeat - 1);
      setAllSectionElements(newSectionElements);
    }
  }

  const getSectionElements = () => {
    console.log('repeat :>> ', repeat);
    const sectionBody = [];
    console.log('section :>> ', section);
    for (let y = 0; y < section.questions.length; y++) {
      let question = section.questions[y];
        const id = section.repeatable ? question._id + "-" + repeat : question._id;
        switch (question.type) {
          case "Input Text":
          sectionBody.push(<InputText key={id} name={id} label={question.text} hint={question.hint} errors={errors}/>);
            break;
          
          case "Name":
          sectionBody.push(<InputText key={id} name={id} label={question.text} hint={question.hint} errors={errors}/>);
              break;
  
          case "Multiple Select":
          sectionBody.push(<Checkbox key={id} name={id} label={question.text} options={question.options} />);
            break;
  
          case "Email":
            sectionBody.push(<Email key={id} name={id} label={question.text} />)
            break;
  
          case "Single Select":
            sectionBody.push(<SingleSelect key={id} name={id} label={question.text} options={question.options} />);
            break;
  
          case "Dropdown":
            sectionBody.push(<Dropdown key={id} name={id} label={question.text} options={question.options} />);
            break;
  
          case "Paragraph":
            sectionBody.push(<TextArea key={id} name={id} label={question.text} options={question.options} />);
            break;
      }
    }
    return (
      <div>
        { sectionBody }
        { section.repeatable && <button onClick={() => removeSection(repeat)}> REMOVE </button>}
      </div>
    )
  }


  const repeatSection = () => {
    if (repeat < section.repeatable) {
      const sectionBody = getSectionElements();
      console.log('repeat :>> ', repeat);
      setRepeat(repeat + 1);
      setAllSectionElements([...allSectionElements, sectionBody]);
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
