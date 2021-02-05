import React, { Component } from 'react';

import { Link } from "react-router-dom";


class Dashboard extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      stageIndex: 0,
    }      
  }

  setStageByIndex(idx){
    this.setState({stageIndex: idx});
  }

  renderDashboardStart(){
    return (
      <div className="border-grey-200 border-4 rounded-md shadow-xl">
        <div className="status">
          <div className="p-14 flex">
            <div className="flex items-center justify-between flex-col"> 
              <div className="text-center px-28 text-lg">
                The Merit Award Bursary Program provides bursaries to senior high school students as an incentive to stay in school, recognizing those who demonstrate a commitment to their school work, extra curricular activities, and communities.
              </div>
              <div className="pt-6">
                <button onClick={() => this.setStageByIndex(1)} className="group relative flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-900 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                  Start Application  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDashboardMain(){
    return (
      <div> 
      Dashboard Main
        <div className="pt-6">
          <button onClick={() => this.setStageByIndex(2)} className="group relative flex justify-center justify-between py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-900 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
            Submit Application  
          </button>
        </div>
      </div>
    );
  }


  renderDashboardStatus(){
    return (
      <div> 
        <div className="text-center px-28 text-lg text-red-600 pb-4">
          Please complete your application before <b>September 24, 2020 by 9:00PM EST</b> to be eligible for consideration.
        </div>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 tracking-wider">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 tracking-wider">
                        Application Status
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 tracking-wider">
                        Submmission Date
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-lg font-medium text-gray-900">
                          FirstName LastName
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="p-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Submitted
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        2 days ago
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <a href="/dashboard" class="text-blue-500 hover:text-blue-900">View</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full space-y-8">
          <h2 className="mt-6 text-center text-5xl text-bold text-gray-700">
            Dashboard
          </h2>
                {this.state.stageIndex == 0 && this.renderDashboardStart()}
                {this.state.stageIndex == 1 && this.renderDashboardMain()}
                {this.state.stageIndex == 2 && this.renderDashboardStatus()}

// merged in 
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

// merged in 
        </div>
      </div>
    );
  }
}

export default Dashboard;




