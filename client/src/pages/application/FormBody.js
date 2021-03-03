import React, { useState, useEffect, useRef } from "react";
import {InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea, CustomErrorMessage} from '../../components/questions/forms';
import {FieldArray, Field, ErrorMessage} from 'formik';

function Section(props) {
  const { index, values, data, errors } = props;
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
    const question = data[0].questions.filter(question => question._id == questionId);
    return question[0];
  }

  //values is a list of section bodies starts with 1 and adds
  // values: {sections: [{id: values, id: value}]}
  const sectionQuestions = values.sections[0][0];
  // console.log('values :>> ', values);
  // console.log('sectionQuestions :>> ', sectionQuestions);

  return (
    <FieldArray 
      name="sections[0]"
      render={arrayHelpers => (
        <div>
          {
          // map each section of questions
          values.sections[0].map((sec, index) => {
            // section is a section of repeatable questions
            // sec: {"ids": "values"}
            // we want to duplicate each section
            const questionIds = Object.keys(sec);
            const questions = questionIds.map((id, ind) => {
              const currQuestion = getQuestion(id);
              return (
                <div key={`${id}-${index}`}>
                  <label htmlFor={`${id}-${index}`} >{currQuestion.text}</label>
                  <Field name={`sections[0].${index}.${currQuestion._id}`} />
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

function FormBody({data, values, errors}) {
  const [formElements, setFormElements] = useState([]);
  useEffect(() => {
    const formElementList = []
    for (let i = 0; i < values.sections.length; i++) {
      formElementList.push(<Section key={i} index={i} values={values} data={data} errors={errors}></Section>);
    }
    setFormElements(formElementList)
  }, [])


  const getQuestion = (sectionId, questionId) => {
    const question = data[sectionId].questions.filter(question => question._id == questionId);
    return question[0];
  }

  return (
    <div>
      {
        values.sections.map((section, sectionIndex) => {
          const sectionQuestions = {};
          for (const [key, value] of Object.entries(section[0])) {
            sectionQuestions[key] = '';
          }
          
          return (
          <div key={sectionIndex}>
            <h1>{data[sectionIndex].name}</h1>
            <div>{data[sectionIndex].label != 'none' ? data[sectionIndex].label : ''}</div>
            <FieldArray
            name={`sections[${sectionIndex}]`}
            render={arrayHelpers => (
              <div>
                {
                // map each section of questions
                values.sections[sectionIndex].map((sec, index) => {
                  // section is a section of repeatable questions
                  // sec: {"ids": "values"}
                  // we want to duplicate each section
                  const questionIds = Object.keys(sec);
                  const questions = questionIds.map((id, ind) => {
                    const currQuestion = getQuestion(sectionIndex, id);
                    return (
                      <div key={`${id}-${index}`}>
                        <label htmlFor={`${id}-${index}`} >{currQuestion.text}</label>
                        <Field name={`sections[${sectionIndex}].${index}.${currQuestion._id}`} />
                        <ErrorMessage name={`sections[${sectionIndex}].${index}.${currQuestion._id}`} />
                      </div>
                    )
                  })
                  return (
                    <div key={index}>
                      { questions }
                      {data[sectionIndex].repeatable > 0 && values.sections[sectionIndex].length > 1 && <button 
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        >
                        Remove
                      </button>}
                      
                    </div>
                  )
                })}

                { data[sectionIndex].repeatable > 0 && values.sections[sectionIndex].length < data[sectionIndex].repeatable &&
                <button
                  type="button"
                  className="secondary"
                  onClick={() => { 
                    arrayHelpers.push(sectionQuestions);
                  }
                  }
                >
                  Add Section
                </button>
                }
              </div>
            )}
          />
          </div>)
        })
      }
      
    </div>
  )
}

export default FormBody;
