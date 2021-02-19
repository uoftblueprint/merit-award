import React, { useState } from "react";
import { Link } from "react-router-dom";

function References() {
    const [stage, setStage] = useState(1);

    function StageSwitch(props) {
      switch(props.stage) {
        case 1:
          return (
            <div>
                <p>my teachers</p>
                <div className="flex justify-center items-center">
                    <button className="mr-5 bg-blue-900 hover:bg-blue-500 text-white border border-blue-900 py-2 px-6 rounded-lg">
                      Request an academic reference.
                    </button>
                </div>
            </div>
          )
        case 2:
          return (<div> my extra currics - i don't think this page exists in the new design though :( </div>)
      }
    }

    let stages = [
      {
        index: 1,
        name: "Teacher References"
      },
      {
        index: 2,
        name: "Extracurricular References"
      }
    ]

    return (
      <div className="application flex flex-column m-20">
        <div className="mt-20 bg-ma rounded-full p-2">
          <Link to="/application" className="px-4 text-white">Application Form</Link>
          <Link to="/references" className="px-4 text-white">References</Link>
          <span className="px-4 text-white">Additional Attachments</span>
        </div>
        <div className="my-10">
          <p>
            For your application, we require two teacher references. Please send a reference request to your teacher.
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

export default References;