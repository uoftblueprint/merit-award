import React, { useState, useEffect } from "react";
import {
  Formik,
  Form,
  ErrorMessage,
  connect
} from "formik";
import {getAnswers, getQuestions, postResponses} from '../../api/application';
import FormBody from "./FormBody";
import * as Yup from 'yup';


function Student() {
  const [isLoading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState({});
  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log(step);
    const getData = async () => {
      setLoading(true);
      setFormData({});
      setFormValidation({});
      const data = await getQuestions(step);
      await initForm(data);
      setLoading(false);
    };
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [step]);

  const initForm = async (data) => {
    setFormData(data);
    const prevAnswers = await getAnswers();
    let _validationSchema = {};
    let _initialValues = [];
    for (let i = 0; i < data.length; i++) {
      let section = data[i];
      let currSectionOfQuestions = [];
      let numRepeat = 0;
      let moreAnswers = true;
      while (moreAnswers) {
        let currSection = {};
        for (let y = 0; y < section.questions.length; y++) {
          let question = section.questions[y];
  
          // prevAnswers[question._id] is an array of answers
          if (prevAnswers[question._id]) {
            currSection[question._id] = prevAnswers[question._id][numRepeat];
            if (prevAnswers[question._id].length - numRepeat <= 1) {
              moreAnswers = false;
            } 
          } else {
            currSection[question._id] = "";
            moreAnswers = false;
          }
  
          // const currQuestionId = question._id;
          // if(question.type === "Name" || question.type === "Input Text"){
          //   _validationSchema[currQuestionId] = Yup.string().required(question.text + ' required');
          // } else if(question.type === "Email"){
          //   _validationSchema[currQuestionId] = Yup.string().email("Email must be valid").required(question.text + ' required')
          // } else if(question.type === "Single Select" || question.type === ""){
          //   _validationSchema[currQuestionId] = Yup.string().oneOf(question.options).required('Selection required');
          // } else if(question.type === "Dropdown" || question.type === ""){
          //   _validationSchema[currQuestionId] = Yup.string().oneOf(question.options).required('Dropdown selection required');
          // } else if(question.type === "Paragraph" || question.type === ""){
          //   _validationSchema[currQuestionId] = Yup.string().required('Description required').max(question.charCount);
          // }
        }
        currSectionOfQuestions.push(currSection);
        numRepeat++;
      }
      _initialValues.push(currSectionOfQuestions);
    }

    // setFormValidation(Yup.object().shape({ 
    //   sections: Yup.array().of(
    //     Yup.array().of(
    //       Yup.object().shape(_validationSchema)
    //     )
    //   )
    // }));
    
    setSnapshot(_initialValues);
  }

  const steps = [
    {
      index: 1,
      name: "Applicant Info",
    },
    {
      index: 2,
      name: "Involvement Info",
    },
    {
      index: 3,
      name: "Education Info",
    },
    {
      index: 4,
      name: "Mentorship Info",
    },
  ];

  function getStep() {
    return steps.map((step) => (
      <div
        key={step.index}
        className="cursor-pointer hover:text-blue-500"
        onClick={() => {
          setStep(step.index);
        }}
      >
        <span className="border border-blue-900 rounded-full py-0.5 px-1.5 mr-2">
          {step.index}
        </span>
        {step.name}
      </div>
    ));
  }

  function previous(values) {
    setSnapshot(values);
    setStep(step-1)
  }

  async function handleSubmit(values, actions) {
    setSnapshot(values.sections)
    try {
      await postResponses(values.sections);
      setStep(step+1)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="application flex flex-column m-20">
      <div className="mt-20 bg-ma rounded-full p-2">
        <span className="px-4 text-white">Application Form</span>
        <span className="px-4 text-white">References</span>
        <span className="px-4 text-white">Additional Attachments</span>
      </div>
      <div className="my-10">
        <p>
          The Merit Award Bursary Program provides bursaries to senior high
          school students as an incentive to stay in school, recognizing those
          who demonstrate a commitment to their schoolwork, extra-curricular
          activities and communities.
        </p>
        <p>
          Please fill out all required information before submitting your
          application.
        </p>
      </div>
      <div className="p-2 flex border border-blue-200 space-x-10 rounded-full">
        {getStep()}
      </div>
      <div>
      <Formik initialValues={{sections: snapshot}} onSubmit={handleSubmit} enableReinitialize>
      {({ errors, values }) => {
        console.log('errors :>> ', errors);
        return (
          <Form id={step}>
          {!isLoading && <FormBody data={formData} values={values} errors={errors}/>}
          {step !== 1 && (
          <button onClick={() => previous(values)}>Previous</button>
          )}
          <button type="submit">
            Next
          </button>
        </Form>
        )
      }}
      </Formik>
      </div>
    </div>
  );
}

export default Student;
