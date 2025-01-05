import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/EnrolNow.css"; // Import the CSS

export default function EnrollNow() {
  const [participants, setParticipants] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isParticipantsInitialized, setIsParticipantsInitialized] =
    useState(false);

  const navigate = useNavigate();

  const param = useParams();

  const departmentSeminars = {
    seminar1: "CO",
    seminar2: "IT",
    seminar3: "EXTC",
    seminar4: "Civil",
    seminar5: "Mechanical",
    seminar6: "Electrical",
  };

  const userBranch = "CO"; // Replace this with actual branch logic

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

  const initializeParticipants = () => {
    if (
      !isParticipantsInitialized &&
      param.eventname &&
      eventLimits[param.eventname]
    ) {
      setParticipants(
        Array(eventLimits[param.eventname]).fill({
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
  };

  useEffect(() => {
    initializeParticipants();
  }, [param.eventname, isParticipantsInitialized]);

  const handleInputChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setParticipants(updatedParticipants);
  };

  const handleSubmit = () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name.");
      return;
    }

    if (participants.some((p) => Object.values(p).some((v) => !v))) {
      toast.error("Please fill out all fields for all participants.");
      return;
    }

    if (departmentSeminars[param.eventname] !== userBranch) {
      toast.error(
        `Access restricted. Only ${departmentSeminars[param.eventname]} department can enroll in this seminar.`
      );
      return;
    }

    toast.success("Participants registered successfully!");
    setParticipants([]); // Clear the forms after submission
    setGroupName(""); // Clear group name
    setIsParticipantsInitialized(false);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register Participants</h2>
      {param.eventname && eventLimits[param.eventname] && (
        <div>
          <h3>
            {param.eventname} (Limit: {eventLimits[param.eventname]}{" "}
            participants)
          </h3>

          <Form.Group>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Form.Group>

          {participants.map((participant, index) => (
            <Form className="mb-3 participant-form" key={index}>
              <h5>Participant {index + 1}</h5>
              <Form.Group>
                <Form.Label>Name</Form.Label>
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
                <Form.Label>Email</Form.Label>
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
                <Form.Label>Phone</Form.Label>
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
                <Form.Label>Age</Form.Label>
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
                <Form.Label>College Name</Form.Label>
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
                <Form.Label>Year</Form.Label>
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
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  as="select"
                  value={participant.branch}
                  onChange={(e) =>
                    handleInputChange(index, "branch", e.target.value)
                  }
                >
                  <option value="">Select Branch</option>
                  {[...Object.values(departmentSeminars)].map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          ))}

          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
