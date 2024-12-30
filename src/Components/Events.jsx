import React from "react";
import "../CSS/Events.css";
import Bf from "../Images/1.png";
import EQ from "../Images/2.png";
import SS from "../Images/4.png";
import EL from "../Images/3.png";
import SE from "../Images/5.png";
import mmf from "../Images/13.png";
import ppt from "../Images/14.png";
import miw from "../Images/12.png";
import flogo from "../Images/fiestaLogo.png";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const Navigate = useNavigate();

  const events = [
    {
      eventName: "businessfair",
      poster: Bf,
      displayName: "Business Fair",
    },
    {
      eventName: "sparkstudio",
      poster: SS,
      displayName: "Spark Studio",
    },
    {
      eventName: "elocution",
      poster: EL,
      displayName: "Elocution",
    },
    {
      eventName: "miw",
      poster: miw,
      displayName: "Mock Interview Workshop",
    },
    {
      eventName: "mmf",
      poster: mmf,
      displayName: "Master & Miss FIesta",
    },
    {
      eventName: "ecoquiz",
      poster: EQ,
      displayName: "Eco Quiz",
    },
    {
      eventName: "ppt",
      poster: ppt,
      displayName: "PPT Case study",
    },
    {
      eventName: "seminars",
      poster: SE,
      displayName: "Seminars",
    },
  ];

  return (
    <div className="outer">
      <div className="container">
        <div className="row">
          {events.map((value, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4"
            >
              <div
                className="card-container"
                onClick={() =>
                  value.eventName === "seminars"
                    ? Navigate(`/seminars`)
                    : Navigate(`/eventdetails/${value.eventName}`)
                }
              >
                <img
                  src={value.poster}
                  className="event-image"
                  alt={`${value.displayName} Poster`}
                />
                <div className="event-overlay">
                  <h3 className="event-title">{value.displayName}</h3>
                  <p className="event-subtitle">Click to Learn More</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
