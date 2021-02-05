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
        </div>
      </div>
    );
  }
}

export default Dashboard;




