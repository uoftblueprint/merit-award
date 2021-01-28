import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import Applicant from "./application/Applicant";
import Involvement from "./application/Involvement";
import Education from "./application/Education";
import Mentorship from "./application/Mentorship";
import { getQuestions } from "../api/application";

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

  function StageSwitch(props) {
    switch(props.stage) {
      case 1:
        return <Applicant/>
      case 2:
        return <Involvement/>
      case 3:
        return <Education/>
      case 4:
        return <Mentorship/>
    }
  }

  let stages = [
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
        {
          stages.map(stage =>
            <div className="cursor-pointer hover:text-blue-500" onClick={() => setStage(stage.index)}>
              <span className="border border-blue-900 rounded-full py-0.5 px-1.5 mr-2">{stage.index}</span>
              {stage.name}
            </div>
          )
        }
      </div>
      <div>
        <StageSwitch stage={stage}/>
      </div>
    </div>
  );
}

export default Application;
