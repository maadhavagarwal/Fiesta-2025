import React, { useState } from "react";
import "../CSS/seminar.css";
import s1 from "../Images/6.jpg";
import s2 from "../Images/7.jpg";
import s3 from "../Images/8.jpg";
import s4 from "../Images/9.jpg";
import s5 from "../Images/10.jpg";
import s6 from "../Images/11.jpg";
import { useNavigate } from "react-router-dom";

export default function Seminars() {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState("");

  const seminars = [
    { branch: "Computer Engineering", seminarName: "seminar1", poster: s1, displayName: "CO Seminar" },
    { branch: "Mechanical Engineering", seminarName: "seminar2", poster: s2, displayName: "ME Seminar" },
    { branch: "Electronics & Telecommunication", seminarName: "seminar3", poster: s3, displayName: "ETC Seminar" },
    { branch: "Information tecnology", seminarName: "seminar4", poster: s4, displayName: "IF Seminar" },
    { branch: "Civil Engineering", seminarName: "seminar5", poster: s5, displayName: "Civil Seminar" },
    { branch: "TSEC", seminarName: "seminar6", poster: s6, displayName: "TSEC Seminar" },
  ];

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const filteredSeminars = seminars.filter((seminar) => seminar.branch === selectedBranch);

  return (
    <div className="outer">
      <div className="container">
        {/* Dropdown to select a branch */}
        <div className="row mb-4">
          <div className="col-12">
            <select onChange={handleBranchChange} className="form-select">
              <option value="">Select a Branch</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
              <option value="Information tecnology">Information tecnology</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="TSEC">TSEC</option>
            </select>
          </div>
        </div>

        {/* Seminar cards */}
        <div className="row">
          {filteredSeminars.length > 0 ? (
            filteredSeminars.map((value, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4"
              >
                {value.branch === "TSEC" ? (
                  <div
                    className="card-container"
                    onClick={() => navigate(`/entries-full`)}
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
                ) : (
                  <div
                    className="card-container"
                    onClick={() => navigate(`/eventdetails/${value.seminarName}`)}
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
                )}
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Please select a branch to see the seminars.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
