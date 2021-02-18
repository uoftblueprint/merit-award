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

function Dashboard() {

  const [stageIndex, setStageByIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  let backgroundColor = modalOpen ? 'rgba(107, 114, 128)' : 'white';
  let border = modalOpen ? 'black' : 'rgba(229, 231, 235)';


  return (
    <div style={{backgroundColor: backgroundColor}} className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-superlightgray">
      <div className="max-w-6xl w-full space-y-8 flex items-center flex-column">
        <h2 className="mt-6 text-center text-5xl text-bold text-gray-700">
          Dashboard
        </h2>
        {stageIndex == 0 && <RenderDashboardStart setStageByIndex={setStageByIndex} borderColor={border} />}
        {stageIndex == 1 && <RenderDashboardMain setStageByIndex={setStageByIndex}/>}

        <button onClick={() => setModalOpen(true)} className="group relative flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
          TEST modal popup
        </button>    

            { modalOpen && 
            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start flex flex-col">
                      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                          Verify Your Account
                        </h3>
                        <div class="mt-2">
                          <p class="text-md text-gray-500">
                            Account activation code has been sent to the e-mail address you provided. Please enter it below.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-center justify-center px-4 py-3 sm:px-6 sm:flex">
                    <button onClick={() => setModalOpen(false)} type="button" class="sm:align-middle inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-lg font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-1/2 sm:text-sm">
                      Confirm
                    </button>
                    <button type="button" class="mt-3 sm:align-middle inline-flex justify-center rounded-md  px-4 py-2 bg-white text-lg font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-1/2 sm:text-sm">
                      Resend Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
            }
      </div>
    </div>
  );
}

export default Dashboard;
