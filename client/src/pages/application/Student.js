import React, { useState, useEffect } from "react";
import {
  Formik,
  Form,
} from "formik";
import {getQuestions, postResponses} from '../../api/application';
import FormBody from "./FormBody";

function Student() {
  const [isLoading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState({});
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log(step);
    const getData = async () => {
      setLoading(true);
      setFormData({});
      const data = await getQuestions(step);
      console.log(data)
      setFormData(data);
      setLoading(false);
    };
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [step]);

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
    setSnapshot(values)
    try {
      await postResponses(values)
      console.log("done")
      setStep(step+1)
    } catch (e) {
      console.log(e);
    }
    console.log(values);
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
      <Formik initialValues={snapshot} onSubmit={handleSubmit}>
      {({ values }) => {
        return (
          <Form id={step}>
          {!isLoading && <FormBody data={formData} values={values}/>}
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
