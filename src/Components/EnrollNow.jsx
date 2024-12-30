import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/EnrolNow.css"; // Import the CSS

export default function EnrollNow() {
  const [participants, setParticipants] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isParticipantsInitialized, setIsParticipantsInitialized] = useState(false);

  const param = useParams();

  // Event limits and API URLs
  const eventLimits = {
    businessfair: 3,
    elocution: 1,
    ecoquiz: 2,
    mmf: 1,
    ppt: 2,
    mystry: 1,
    miw: 1,
    sparkstudio:6,
    seminar1: 1,
    seminar2: 1,
    seminar3: 1,
    seminar4: 1,
    seminar5: 1,
    seminar6: 1,
  };
  const eventAPIs = { businessfair: "https://sheetdb.io/api/v1/dya4xmkayf7re", elocution: "https://sheetdb.io/api/v1/b8a6v109rt4ju", ecoquiz: "https://sheetdb.io/api/v1/gzsa9kzk2svkv", mmf: "https://sheetdb.io/api/v1/ybo9zku6nr4v2", ppt: "https://sheetdb.io/api/v1/mx2irw7wdlozb", mystry: "https://sheetdb.io/api/v1/nzsex4qm4746a", miw: "https://sheetdb.io/api/v1/qn3zkb9qi9rwl", seminar1: "https://sheetdb.io/api/v1/o6aq1fl2vjs4l", seminar2: "https://sheetdb.io/api/v1/al6wjwijgmpyf", seminar3: "https://sheetdb.io/api/v1/e315njaflvrm0", seminar4: "https://sheetdb.io/api/v1/p8fxxcoz709pj", seminar5: "https://sheetdb.io/api/v1/6v3c5qrc7avqj", seminar6: "https://sheetdb.io/api/v1/62j1lgbc8m4us", };
  // Fixed payment amounts
  const fixedPaymentAmount = {
    businessfair: 900,
    elocution: 81,
    ecoquiz: 81,
    mmf: 81,
    ppt: 81,
    mystry: 81,
    miw: 81,
    seminar1: 0,
    seminar2: 0,
    seminar3: 0,
    seminar4: 0,
    seminar5: 0,
    seminar6: 0,
  };

  // Initialize participants based on the event
  const initializeParticipants = () => {
    if (!isParticipantsInitialized && param.eventname && eventLimits[param.eventname]) {
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

  // Handle input changes for participant data
  const handleInputChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
    setParticipants(updatedParticipants);
  };

  // Handle Razorpay payment and submission to SheetDB
  const handleRazorpayPayment = async () => {
    const amount = fixedPaymentAmount[param.eventname];

    const options = {
      key: "rzp_test_d0uDNEq3eZ4bnW", // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: groupName,
      description: `Payment for ${param.eventname}`,
      handler: async function (response) {
        // Show success message
        toast.success("Payment completed successfully!");

        // Prepare data for SheetDB
        const groupId = Math.random().toString(36).substr(2, 9); // Random group ID
        const dataToSubmit = {
          groupId,
          groupName,
          ...participants.reduce((acc, participant, index) => {
            const participantIndex = index + 1;
            acc[`participant${participantIndex}_name`] = participant.name;
            acc[`participant${participantIndex}_email`] = participant.email;
            acc[`participant${participantIndex}_phone`] = participant.phone;
            acc[`participant${participantIndex}_age`] = participant.age;
            acc[`participant${participantIndex}_collegeName`] = participant.collegeName;
            acc[`participant${participantIndex}_year`] = participant.year;
            acc[`participant${participantIndex}_branch`] = participant.branch;
            return acc;
          }, {}),
        };

        try {
          // Send data to SheetDB
          const response = await fetch(eventAPIs[param.eventname], {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
          });

          if (response.ok) {
            toast.success("Participants registered successfully!");
            setParticipants([]); // Clear forms
            setGroupName(""); // Clear group name
            setIsParticipantsInitialized(false); // Reset initialization
          } else {
            toast.error("Failed to post data to SheetDB. Please try again.");
          }
        } catch (error) {
          console.error("Error posting data to SheetDB:", error);
          toast.error("An error occurred while posting data to SheetDB.");
        }
      },
      prefill: {
        name: participants[0]?.name || "",
        email: participants[0]?.email || "",
        contact: participants[0]?.phone || "",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function () {
      toast.error("Payment failed. Please try again.");
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name.");
      return;
    }

    if (participants.some((p) => Object.values(p).some((v) => !v))) {
      toast.error("Please fill out all fields for all participants.");
      return;
    }

    // Skip payment for seminars
    if (!param.eventname.startsWith("seminar")) {
      await handleRazorpayPayment();
    } else {
      toast.success("Participants registered successfully!");
      setParticipants([]); // Clear the forms after submission
      setGroupName(""); // Clear group name
      setIsParticipantsInitialized(false);
    }
  };

  return (
    <div className="container">
      <h2>Register Participants</h2>
      {param.eventname && eventLimits[param.eventname] && (
        <div>
          <h3>
            {param.eventname} (Limit: {eventLimits[param.eventname]} participants)
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

          <Form.Group>
            <Form.Label>Fixed Payment Amount</Form.Label>
            <Form.Control
              type="text"
              value={`₹${fixedPaymentAmount[param.eventname]}`}
              readOnly
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
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={participant.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter phone"
                  value={participant.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={participant.age}
                  onChange={(e) => handleInputChange(index, "age", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>College Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter college name"
                  value={participant.collegeName}
                  onChange={(e) => handleInputChange(index, "collegeName", e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  as="select"
                  value={participant.year}
                  onChange={(e) => handleInputChange(index, "year", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "branch", e.target.value)}
                >
                  <option value="">Select Branch</option>
                  {[
                    "Computer Engineering",
                    "Civil Engineering",
                    "Electrical Engineering",
                    "Information Technology",
                    "Mechanical Engineering",
                  ].map((branch) => (
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
            disabled={
              !groupName.trim() || participants.some((p) => Object.values(p).some((v) => !v))
            }
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
