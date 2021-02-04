import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import Applicant from "./application/Applicant";
import Involvement from "./application/Involvement";
import Education from "./application/Education";
import Mentorship from "./application/Mentorship";

function Menu(props) {
    const [open, setAccordian] = useState(0);
    const [stage, setStage] = useState();

    let sections = [
      {
        index: 1,
        name: "Application Form",
        completed: 0,
        stages: [
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
      },
      {
        index: 2,
        name: "References",
        completed: 0,
        stages: [
          {
            index: 1,
            name: "Academic Reference"
          },
          {
            index: 2,
            name: "Academic Reference"
          }
        ]
      },
      {
        index: 3,
        completed: 0,
        name: "Additional Attachments",
        stages: []
      }
    ];

    return (
        <div className="fixed flex flex-column bg-fixed overflow-hidden left-28 rounded-md h-auto w-62 l-50 border bg-white border-gray">

          {sections.map(s =>
            <div id="app-section-1" className="w-full overflow-hidden cursor-pointer">
              <div
                className={`px-3 p-2 ${open == s.index ? "bg-ma text-white " : "bg-lightgray text-gray"}`}
                onClick={() => { setAccordian(s.index); setStage(0); }}>
                  {s.name} { s.index == 3 ? "" : `(${s.completed}` + "/" + `${s.stages.length})` }
              </div>
              <div className={`transition-all ${open == s.index && s.index != 3 ? "h-auto py-2" : "h-0"}`}>
                {s.stages.map(ss =>
                  <div className={`px-3 py-2 flex ${stage == ss.index ? "text-ma" : "text-gray"}`} onClick={() => { setStage(ss.index); props.setStage(ss.index); }}>
                    <span className={`bg-white border border-solid rounded-full border px-2 py-0 ${stage == ss.index ? "border-ma" : "border-gray"}`}>{ss.index}</span>
                    <p className="w-auto px-3">{ss.name}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
    );
}

function Application() {
  const [stage, setStage] = useState(1);
  const [section1, setAccordian1] = useState(false);
  const [section2, setAccordian2] = useState(false);
  const [section3, setAccordian3] = useState(false);

  function validateForm() {
  }

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

  return (
    <div className="application m-20 relative flex flex-column items-center">
      <Menu className="fixed" setStage={setStage}/>
      <div className="w-64 h-50 bg-ma"/>
      <div className="flex flex-column w-50 mt-100">
        <h1 className="text-3xl">Application Form</h1>
        <div className="my-6">
          <p>
            The Merit Award Bursary Program provides bursaries to senior high school students as an incentive to stay in school, recognizing those who demonstrate a commitment to their schoolwork, extra-curricular activities and communities.
          </p>
          <p>
            Please fill out all required information before submitting your application.
          </p>
        </div>
        <div>
          <StageSwitch stage={stage}/>
        </div>
      </div>
    </div>
  );
}

export default Application;
