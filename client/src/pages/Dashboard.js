import React, { useState } from "react";
import { Link } from "react-router-dom";

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

function Dashboard() {
  return (
    <div className="dashboard flex justify-center items-center h-screen bg-superlightgray">
      <div className="status w-3/5 relative">
        <div className="flex border border-blue-900 bg-white relative h-full rounded-md overflow-hidden">
          <Menu />

          <div className="flex items-center justify-center flex-column h-full w-auto p-10">
            <div className="flex items-center justify-center flex-column h-full">
              <h1 className="font-semibold text-xl mb-6">Merit Award Bursary Application</h1>
              <div className="flex text-center">
                <div className="flex-1">
                  <h2 className="p-3 text-gray font-semibold border-b border-lightgray">Application Status</h2>
                  <div className="p-3">??? of UMM required tasks complete</div>
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
    </div>
  );
}

export default Dashboard;
