import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea} from '../../components/questions/forms';
import {ErrorMessage, FieldArray, Field} from 'formik';

function Section(props) {
  const { section, values, errors } = props;
  // console.log('section :>> ', section);
  const allSections = [section]
  const questions = section.questions;

  // useEffect(() => {
  //   const sectionBody = getSectionElements();
  //   setAllSectionElements([...allSectionElements, sectionBody]);
  // }, [])

  // const getSectionElements = () => {
  //   // maybe consider making this a separate component that we can pass props down to
  //   const sectionBody = [];
  //   for (let y = 0; y < section.questions.length; y++) {
  //     let question = section.questions[y];
  //       const id = section.repeatable ? question._id + "-" + sectionId : question._id;
  //       setSectionId(sectionId + 1);
  //       switch (question.type) {
  //         case "Input Text":
  //         sectionBody.push(<InputText key={id} name={id} label={question.text} hint={question.hint} errors={errors}/>);
  //           break;
          
  //         case "Name":
  //         sectionBody.push(<InputText key={id} name={id} label={question.text} hint={question.hint} errors={errors}/>);
  //             break;
  
  //         case "Multiple Select":
  //         sectionBody.push(<Checkbox key={id} name={id} label={question.text} options={question.options} />);
  //           break;
  
  //         case "Email":
  //           sectionBody.push(<Email key={id} name={id} label={question.text} />)
  //           break;
  
  //         case "Single Select":
  //           sectionBody.push(<SingleSelect key={id} name={id} label={question.text} options={question.options} />);
  //           break;
  
  //         case "Dropdown":
  //           sectionBody.push(<Dropdown key={id} name={id} label={question.text} options={question.options} />);
  //           break;
  
  //         case "Paragraph":
  //           sectionBody.push(<TextArea key={id} name={id} label={question.text} options={question.options} />);
  //           break;
  //     }
  //   }
  //   return (
  //     <div key={section._id + '-' + sectionId}>
  //       { sectionBody }
  //     </div>
  //   )
  // }
  const getSection = (questionId) => {
    return section.questions.filter(question => question._id == questionId);
  }

  return (
    <div>
      <h1 key={section.name}>{section.name}</h1>
      <FieldArray 
        name="sections"
        render={arrayHelpers => (
          <div>
            {values.map((question, index) => {
              // console.log('question :>> ', question);
              return (
                <div key={index}>
                  <label>{getSection(question)[0].text}</label>
                  <Field name={`${question._id}.${index}`} />                         
                </div>
              )
            })}
            {/* <button 
              type="button"
              onClick={() => arrayHelpers.remove(index)}
              >
              Remove
            </button> */}

            <button 
              type="button"
              onClick={() => {console.log('section :>> ', section); arrayHelpers.push('')}}
              >
              Add Section
            </button>
          </div>
        )}
      />
    </div>
  )
}

function FormBody({data, values, errors}) {
  const [formElements, setFormElements] = useState([]);
  useEffect(() => {
    const formElementList = []
    for (let i = 0; i < data.length; i++) {
      const section = data[i];
      const questionIds = section.questions.map(question => question._id);
      formElementList.push(<Section key={i} values={questionIds} section={data[i]} errors={errors}></Section>)
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
