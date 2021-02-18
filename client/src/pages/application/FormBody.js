import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea} from '../../components/questions/forms';
import {ErrorMessage, FieldArray} from 'formik';

function Section(props) {
  const { section, errors } = props;
  const [ allSectionElements, setAllSectionElements ] = useState([]);
  const [ sectionId, setSectionId ] = useState(0);

  useEffect(() => {
    const sectionBody = getSectionElements();
    setAllSectionElements([...allSectionElements, sectionBody]);
  }, [])

  // const removeSection = (index) => {
  //   // can't use index
  //   if (repeat >= 1) {
  //     const newSectionElements = [...allSectionElements];
  //     newSectionElements.splice(index + 1, 1);
  //     console.log('newSectionElements :>> ', newSectionElements);
  //     console.log('repeat :>> ', repeat);
  //     setRepeat(repeat - 1);
  //     setAllSectionElements(newSectionElements);
  //   }
  // }

  const removeSection = (event) => {
    event.preventDefault();
    // This is weird because each individual sectionbody that this remove section belongs to has its own copy of allsection elements so we need to move this up to the parent.
    console.log('event :>> ', event);
    console.log('sectionElements :>> ', allSectionElements);
    // const newSectionElements = allSectionElements.filter(sec => sec != event);
    // console.log('newSectionElements :>> ', newSectionElements);
    // setAllSectionElements(newSectionElements)
  }

  const getSectionElements = () => {
    // maybe consider making this a separate component that we can pass props down to
    const sectionBody = [];
    for (let y = 0; y < section.questions.length; y++) {
      let question = section.questions[y];
        const id = section.repeatable ? question._id + "-" + sectionId : question._id;
        setSectionId(sectionId + 1);
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
      <div key={section._id + '-' + sectionId}>
        { sectionBody }
        { section.repeatable && <button onClick={(el) => removeSection(el)}> REMOVE </button>}
      </div>
    )
  }


  const repeatSection = () => {
    if (allSectionElements.length <= section.repeatable) {
      const sectionBody = getSectionElements();
      setAllSectionElements([...allSectionElements, sectionBody]);
    }
  }


  return (
    <div>
      <h1 key={section.name}>{section.name}</h1>
      { allSectionElements }
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
