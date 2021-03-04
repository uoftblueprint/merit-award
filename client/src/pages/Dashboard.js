import React, { Component, useState } from 'react';

import { Link } from "react-router-dom";


function RenderDashboardStart(props){
  return (
    <div className="border-grey-200 border rounded-md shadow-xl">
      <div className="status">
        <div className="p-14 flex">
          <div className="flex items-center justify-between flex-col">
            <div className="text-center px-28 text-lg">
              The Merit Award Bursary Program provides bursaries to senior high school students as an incentive to stay in school, recognizing those who demonstrate a commitment to their school work, extra curricular activities, and communities.
            </div>
            <div className="pt-6">
              <button onClick={() => props.setStageByIndex(1)} className="group relative flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-900 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                Start Application
              </button>
            </div>
            <div className="pt-6">
              <button onClick={() => props.logout()} className="group relative flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-900 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function RenderDashboardMain(props){
  return (
      <div className="status relative w-4/5">
        <div className="flex border border-blue-900 bg-white relative h-full rounded-md overflow-hidden">
          <Menu />
          <div className="flex items-center justify-center flex-column h-full w-auto p-10">
            <div className="flex items-center justify-center flex-column h-full">
              <h1 className="font-semibold text-xl mb-6">Merit Award Bursary Application</h1>
              <div className="flex text-center">


                <div className="flex-1">
                  <h2 className="p-3 text-gray font-semibold border-b border-lightgray">Application Status</h2>
                  <div class="py-2 px-3 m-3 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Submitted
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="p-3 text-gray font-semibold border-b border-lightgray">Deadline</h2>
                  <div className="p-3">FILLER DATE PLS REPLACE</div>
                </div>
                <div className="flex-1">
                  <h2 className="p-3 text-gray font-semibold border-b border-lightgray">Last Edited</h2>
                  <div className="p-3">long long time ago</div>
                </div>

              </div>
            </div>
            <Link to="/application" className="flex-auto font-semibold px-4 text-purple-500">Edit Application</Link>
          </div>
        </div>
      </div>
  );
}

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
        <div className="flex flex-column bg-fixed overflow-hidden h-auto w-72 l-50 border-right bg-white border-gray py-4 px-2">

          {sections.map(s =>
            <div className="w-full overflow-hidden">
              <div className="px-3 p-2 text-ma font-semibold"> {s.name} </div>
              <div className="transition-all py-2">
                {s.stages.map(ss =>
                  <div className={`px-3 py-1 flex ${stage == ss.index ? "text-ma" : "text-gray"}`} >
                    <span className={`bg-white border border-solid rounded-full border px-2 py-0 ${stage == ss.index ? "border-ma" : "border-gray"}`}>{ss.index}</span>
                    <p className="w-auto px-3 text-sm">{ss.name}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
    );
}

function Dashboard(props) {

  const [stageIndex, setStageByIndex] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-superlightgray">
      <div className="max-w-6xl w-full space-y-8 flex items-center flex-column">
        <h2 className="mt-6 text-center text-5xl text-bold text-gray-700">
          Dashboard
        </h2>
              {stageIndex == 0 && <RenderDashboardStart logout={props.logout} setStageByIndex={setStageByIndex} />}
              {stageIndex == 1 && <RenderDashboardMain setStageByIndex={setStageByIndex}/>}
        </div>
      </div>
  );
}

export default Dashboard;
