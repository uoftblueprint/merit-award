import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea} from '../../components/questions/forms';
import {ErrorMessage, FieldArray, Field} from 'formik';

function Section(props) {
  const { section, values, errors } = props;
  console.log('section :>> ', section);
  console.log('values :>> ', values);

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
  const getQuestion = (questionId) => {
    const question = section.questions.filter(question => question._id == questionId);
    return question[0];
  }

  const getNextQuestions = () => {

  }

  return (
    <div>
      <h1 key={section.name}>{section.name}</h1>
      <FieldArray 
        name="sections"
        render={arrayHelpers => (
          <div>
            {
            // map each section of questions
            values.map((sec, index) => {
              const questionIds = Object.keys(sec);
              return questionIds.map((id, ind) => {
                return (
                  <div key={`${id}-${index}`}>
                    <label htmlFor={`${id}-${index}`} >{getQuestion(id).text}</label>
                    {/* <label>{getSection(question)[0].text}</label> */}
                    <Field name={`${id}-${index}`} />                         
                  </div>
                )
              })
            })}
            {/* <button 
              type="button"
              onClick={() => arrayHelpers.remove(index)}
              >
              Remove
            </button> */}

            <button
              type="button"
              className="secondary"
              onClick={() => {arrayHelpers.push(values[0]); console.log('values :>> ', values);}}
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
    for (let i = 0; i < values.length; i++) {
      formElementList.push(<Section key={i} values={values[i]} section={data[i]} errors={errors}></Section>)
    }
    setFormElements(formElementList)
  }, [])

  const getQuestion = (questionId) => {
    const question = data[0].questions.filter(question => question._id == questionId);
    return question[0];
  }

  const sectionQuestions = values.sections[0][0]
  console.log('values.sections :>> ', values.sections);

  return (
    <FieldArray 
      name="sections"
      render={arrayHelpers => (
        <div>
          {
          // map each section of questions
          values.sections.map((sec, index) => {
            console.log('sec :>> ', sec);
            const questionIds = Object.keys(sec);
            console.log('questionIds :>> ', questionIds);
            const questions = questionIds.map((id, ind) => {
              const currQuestion = getQuestion(id);
              return (
                <div key={`${id}-${index}`}>
                  <label htmlFor={`${id}-${index}`} >{currQuestion.text}</label>
                  <Field name={`sections.${index}.${currQuestion._id}`} />
                </div>
              )
            })
            return (
              <div key={index}>
                { questions }
                <button 
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                  >
                  Remove
                </button>
              </div>
            )
          })}

          <button
            type="button"
            className="secondary"
            onClick={() => { 
              console.log('values.sections :>> ', values.sections); 
              console.log('values.sections[0] :>> ', values.sections[0]); 
              console.log('values.sections[0][0] :>> ', values.sections[0][0]);
              arrayHelpers.push(sectionQuestions); 
            
              console.log('values.sections after :>> ', values.sections );}
            }
          >
            Add Section
          </button>
        </div>
      )}
    />
  )
}

export default FormBody;
