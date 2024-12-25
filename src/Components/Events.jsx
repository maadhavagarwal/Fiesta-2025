import React from "react";

import "../CSS/Events.css"
import Bf from "../Images/1.png"
import EQ from "../Images/2.png"
import SS from "../Images/4.png"
import EL from "../Images/3.png"
import flogo from "../Images/fiestaLogo.png"

import iicLogo from "../Images/iicLogo.png"
import { useNavigate } from "react-router-dom";

export default function Events() {

  const Navigate=useNavigate();

  var events=[
    {
      "eventName":"businessfair",
      "poster":Bf,
    },
    {
      "eventName":"sparkstudio",
      "poster":SS,
    },
    {
      "eventName":"elocution",
      "poster":EL,
    },
    
    {
      "eventName":"eco-quiz",
      "poster":EQ,
    },
    {
      "eventName":"mmf",
      "poster":flogo,
    },
    {
      "eventName":"miw",
      "poster":flogo,
    },
    {
      "eventName":"ppt",
      "poster":flogo,
    },
    {
      "eventName":"mystry",
      "poster":flogo,
    },
    {
      "eventName":"seminar1",
      "poster":flogo,
    },
    {
      "eventName":"seminar2",
      "poster":flogo,
    },
    {
      "eventName":"seminar3",
      "poster":flogo,
    },
    {
      "eventName":"seminar4",
      "poster":flogo,
    },
    {
      "eventName":"seminar5",
      "poster":flogo,
    },
    {
      "eventName":"seminar6",
      "poster":flogo,
    },
  ]

  return (
    <div className="containe1">
    <div className="container">
      <div className="d-flex justify-content-center flex-wrap">

        {events.map((value,index)=>(
          <div className="card mt-5 shadow p-3 mb-5 bg-light rounded mx-5 cardstyle" style={{width: "18rem"}} onClick={()=>Navigate(`/eventdetails/${value.eventName}`)}>
            <img src={value.poster} className="card-img-top" alt="Loading......."/>
        
          </div>
        ))
        }

      </div>
    </div>
    </div>
  );
}
