import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../CSS/Entriesfull.css"

export default function EntriesFull() {
    let navigate=useNavigate()
    return (
      <div className="entries-full-page">
        <div className="entries-full-content">
          <h1 className="entries-full-title">Entries Full</h1>
          <p className="entries-full-description">
            All slots for this event have been filled. !
          </p>
          <button
            className="back-button"
            onClick={() => navigate('/events')}
          >
            Go Back
          </button>
        </div>
      </div>
    );
}
