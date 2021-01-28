import React, { useState } from "react";
import FormBody from "./application/FormBody";

function Application() {
  const [stage, setStage] = useState(1);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        await {/*-- insert function here --*/}
    } catch (err) {
        console.log(err);
    }
  }

  const stages = [
    {
      index: 1,
      name: "Applicant Info"
    },
    {
      index: 2,
      name: "Involvement Info"
    },
    {
      index: 3,
      name: "Education Info"
    },
    {
      index: 4,
      name: "Mentorship Info"
    }
  ]

  function getStage() {
    return stages.map(stage => 
      <div key={stage.index} className="cursor-pointer hover:text-blue-500" onClick={() => {setStage(stage.index)}}>
        <span className="border border-blue-900 rounded-full py-0.5 px-1.5 mr-2">{stage.index}</span>
        {stage.name}
      </div>
    )
  }

  function nextPage() {
    if (stage < stages.length) {
      setStage(stage + 1);
    }
  }

  function previousPage() {
    if (stage > 1) {
      setStage(stage - 1);
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
          The Merit Award Bursary Program provides bursaries to senior high school students as an incentive to stay in school, recognizing those who demonstrate a commitment to their schoolwork, extra-curricular activities and communities.
        </p>
        <p>
          Please fill out all required information before submitting your application.
        </p>
      </div>
      <div className="p-2 flex border border-blue-200 space-x-10 rounded-full">
        { getStage() }
      </div>
      <FormBody pageNum={stage} nextPage={nextPage} previousPage={previousPage} />
    </div>
  );
}

export default Application;
