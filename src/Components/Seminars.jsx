import React from "react";
import "../CSS/seminar.css";
import s1 from "../Images/6.jpg";
import s2 from "../Images/7.jpg";
import s3 from "../Images/8.jpg";
import s4 from "../Images/9.jpg";
import s5 from "../Images/10.jpg";
import s6 from "../Images/11.jpg";
import { useNavigate } from "react-router-dom";

export default function Seminars() {
  const Navigate = useNavigate();

  const seminars = [
    { seminarName: "seminar1", poster: s1, displayName: "Seminar 1" },
    { seminarName: "seminar2", poster: s2, displayName: "Seminar 2" },
    { seminarName: "seminar3", poster: s3, displayName: "Seminar 3" },
    { seminarName: "seminar4", poster: s4, displayName: "Seminar 4" },
    { seminarName: "seminar5", poster: s5, displayName: "Seminar 5" },
    { seminarName: "seminar6", poster: s6, displayName: "Seminar 6" },
  ];

  return (
    <div className="outer">
      <div className="container">
        <div className="row">
          {seminars.map((value, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4"
            >
              <div
                className="card-container"
                onClick={() =>
                  Navigate(`/eventdetails/${value.seminarName}`)
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
