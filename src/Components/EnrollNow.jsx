import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/EnrolNow.css"; // Import the CSS

export default function EnrollNow() {
  const [participants, setParticipants] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [institution, setInstitution] = useState(""); // Institution input
  const [isParticipantsInitialized, setIsParticipantsInitialized] =
    useState(false);

  const navigate = useNavigate();
  const param = useParams();

  // Department-based seminar mapping
  const departmentSeminars = {
    seminar1: "CO",
    seminar2: "IT",
    seminar3: "EXTC",
    seminar4: "Civil",
    seminar5: "Mechanical",
    seminar6: "Electrical",
  };

  // Event-specific participant limits
  const eventLimits = {
    businessfair: 3,
    elocution: 1,
    ecoquiz: 2,
    mmf: 1,
    ppt: 2,
    mystry: 1,
    miw: 1,
    sparkstudio: 6,
    seminar1: 1,
    seminar2: 1,
    seminar3: 1,
    seminar4: 1,
    seminar5: 1,
    seminar6: 1,
  };

  const restrictedEvents = ["seminar1", "seminar2", "mockinterview", "mmf"];

  const userBranch = "CO"; // Replace this with actual branch logic or data

  useEffect(() => {
    if (!isParticipantsInitialized && param.eventName) {
      // Set the number of participants based on the event limit
      const limit = eventLimits[param.eventName];
      if (limit) {
        setParticipants(
          Array(limit).fill({
            name: "",
            email: "",
            phone: "",
            age: "",
            collegeName: "",
            year: "",
            branch: "",
          })
        );
        setIsParticipantsInitialized(true);
      }
    }
  }, [param.eventName, isParticipantsInitialized]);

  const handleInputChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setParticipants(updatedParticipants);
  };

  const handleEnroll = () => {
    // Restrict access for specific events based on institution
    if (
      restrictedEvents.includes(param.eventName) &&
      institution.toLowerCase() !== "thakur polytechnic"
    ) {
      toast.error("This event is restricted to Thakur Polytechnic students.");
      return;
    }

    // Validate if all participant fields and group name are filled
    const emptyFields = participants.some(
      (participant) => !participant.name || !participant.email || !participant.phone
    );

    if (emptyFields || !groupName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Restrict seminar access based on the department
    if (departmentSeminars[param.eventName] !== userBranch) {
      toast.error(
        `Access restricted. Only students from ${departmentSeminars[param.eventName]} department can enroll in this seminar.`
      );
      return;
    }

    // If everything is valid, show success message
    toast.success("Enrollment successful!");
    setParticipants([]); // Clear the forms after submission
    setGroupName(""); // Clear group name
    setIsParticipantsInitialized(false);
    navigate("/thank-you");
  };

  return (
    <div className="container">
      <h2>Enroll Now</h2>
      <div className="participant-form">
        <Form.Group>
          <Form.Label className="form-label">Institution Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your institution name"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="form-label">Group Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>

        {participants.map((participant, index) => (
          <div key={index} className="participant-form">
            <h5>Participant {index + 1}</h5>
            <Form.Group>
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={participant.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={participant.email}
                onChange={(e) =>
                  handleInputChange(index, "email", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone"
                value={participant.phone}
                onChange={(e) =>
                  handleInputChange(index, "phone", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={participant.age}
                onChange={(e) =>
                  handleInputChange(index, "age", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">College Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter college name"
                value={participant.collegeName}
                onChange={(e) =>
                  handleInputChange(index, "collegeName", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Year</Form.Label>
              <Form.Control
                as="select"
                value={participant.year}
                onChange={(e) =>
                  handleInputChange(index, "year", e.target.value)
                }
              >
                <option value="">Select Year</option>
                {["First Year", "Second Year", "Third Year"].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Branch</Form.Label>
              <Form.Control
                as="select"
                value={participant.branch}
                onChange={(e) =>
                  handleInputChange(index, "branch", e.target.value)
                }
              >
                <option value="">Select Branch</option>
                {[...new Set(Object.values(departmentSeminars))].map(
                  (branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </div>
        ))}

        <Button onClick={handleEnroll}>Enroll</Button>
      </div>
    </div>
  );
}
