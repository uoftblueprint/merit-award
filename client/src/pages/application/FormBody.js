import React from "react";
import { InputText, Checkbox, Email, SingleSelect, Dropdown, TextArea } from '../../components/questions/forms';
import { FieldArray } from 'formik';


function Question({name, type, text, hint, options}) {
  switch (type) {
    case "Input Text":
      return <InputText key={name} name={name} label={text} hint={hint}/>;
    
    case "Name":
      return <InputText key={name} name={name} label={text} hint={hint}/>;
    
    // TODO: CHANGE PHONE NUMBER AND DATE SO THEY HAVE THEIR OWN COMPONENTS
    case "Phone Number":
      return <InputText key={name} name={name} label={text} hint={hint}/>;
    
    case "Date":
      return <InputText key={name} name={name} label={text} hint={hint}/>;

    case "Multiple Select":
      return <Checkbox key={name} name={name} label={text} options={options} />;

    case "Email":
      return <Email key={name} name={name} label={text} />;

    case "Single Select":
      return <SingleSelect key={name} name={name} label={text} options={options} />;

    case "Dropdown":
      return <Dropdown key={name} name={name} label={text} options={options} />;

    case "Paragraph":
      return <TextArea key={name} name={name} label={text} options={options} />

    default:
      return <div>No Question</div>
  }
}


function FormBody({data, values, errors}) {
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
                values.sections[sectionIndex].map((sec, index) => {
                  // section is a section of repeatable questions
                  const questionIds = Object.keys(sec);
                  const questions = questionIds.map((id, ind) => {
                    const currQuestion = getQuestion(sectionIndex, id);
                    return (
                      <div key={`${id}-${index}`}>
                        <Question 
                          type={currQuestion.type} 
                          options={currQuestion.options}
                          text={currQuestion.text}
                          hint={currQuestion.hint}
                          name={`sections[${sectionIndex}].${index}.${currQuestion._id}`}
                        />
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
