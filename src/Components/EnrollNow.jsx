import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import Tesseract from "tesseract.js";
import { useNavigate, useParams } from "react-router-dom";
import qr from "../Images/qr.jpg";
import "../CSS/EnrolNow.css";

const eventAPIs = {
  businessfair: "https://sheetdb.io/api/v1/dya4xmkayf7re",
  sparkstudio: "https://sheetdb.io/api/v1/1v3p7rm3ioz4y",
  ecoquiz: "https://sheetdb.io/api/v1/gzsa9kzk2svkv",
  miw: "https://sheetdb.io/api/v1/qn3zkb9qi9rwl",
  ppt: "https://sheetdb.io/api/v1/mx2irw7wdlozb",
  elocution: "https://sheetdb.io/api/v1/b8a6v109rt4ju",
  mastermissfiesta: "https://sheetdb.io/api/v1/60xy0e7ryr8xu",
  mystery: "https://sheetdb.io/api/v1/1zke8b28gsd04",
  seminar1: "https://sheetdb.io/api/v1/o6aq1fl2vjs4l",
  seminar2: "https://sheetdb.io/api/v1/al6wjwijgmpyf",
  seminar3: "https://sheetdb.io/api/v1/e315njaflvrm0",
  seminar4: "https://sheetdb.io/api/v1/p8fxxcoz709pj",
  seminar5: "https://sheetdb.io/api/v1/6v3c5qrc7avqj",
  seminar6: "https://sheetdb.io/api/v1/62j1lgbc8m4us",
};

const perPersonPrice = {
  sparkstudio: 100,
  ppt: 81,
  mystery: 81,
};

const fixedPaymentAmount = {
  elocution: 100,
  ecoquiz: 100,
  mastermissfiesta: 100,
  miw: 100,
  businessfair: 911.00,
  seminar1: 0,
  seminar2: 0,
  seminar3: 0,
  seminar4: 0,
  seminar5: 0,
  seminar6: 0,
};

const eventLimits = {
  businessfair: 3,
  sparkstudio: 6,
  ecoquiz: 2,
  miw: 1,
  ppt: 2,
  elocution: 1,
  mastermissfiesta: 1,
  mystery: 5,
  seminar1: 1,
  seminar2: 1,
  seminar3: 1,
  seminar4: 1,
  seminar5: 1,
  seminar6: 1,
};
const stallTypeLimits = {
  food: 15,
  service: 6,
  games: 10,
  other: 4,
};

export default function ParticipantForm() {
  const [participants, setParticipants] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [electronicProducts, setElectronicProducts] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [stallDetails, setStallDetails] = useState("");
  const [stallType, setStallType] = useState("");
  const [takenStallDetails, setTakenStallDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ocrText, setOcrText] = useState("");
  const [isOcrVerified, setIsOcrVerified] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [existingTransactionIds, setExistingTransactionIds] = useState([]);
  const navigate = useNavigate();
  const { eventname } = useParams();

  useEffect(() => {
    initializeParticipants();
    if (eventname === "businessfair") {
      fetchTakenStalls();
    }
    fetchExistingTransactionIds();
  }, [eventname]);

  const initializeParticipants = () => {
    const participantLimit = eventLimits[eventname];
    const participantArray = Array(participantLimit).fill({
      name: "",
      email: "",
      phone: "",
      age: "",
      collegeName: "",
      year: "",
      branch: "",
    });
    setParticipants(participantArray);
    calculateTotalPrice(participantArray);
  };

  const fetchTakenStalls = async () => {
    try {
      const response = await fetch(eventAPIs[eventname]);
      const data = await response.json();
      const foodStalls = data.filter(entry => entry.stallType === "food"); // Filter for food stalls
      const stalls = foodStalls.map((entry) => entry);
      setTakenStallDetails(stalls);
    } catch (error) {
      console.error("Error fetching taken food stalls:", error);
      toast.error("Failed to fetch taken food stall details.");
    }
  };
  

  const fetchExistingTransactionIds = async () => {
    try {
      const response = await fetch(eventAPIs[eventname]);
      const data = await response.json();
      const transactionIds = data.map((entry) => entry.transactionId);
      setExistingTransactionIds(transactionIds);
    } catch (error) {
      console.error("Error fetching existing transaction IDs:", error);
    }
  };

  const handlePaymentConfirmation = () => {
    if (!transactionId.trim() || !paymentImage) {
      toast.error("Please complete payment details.");
      return;
    }

    // Check if the transaction ID is unique
    if (existingTransactionIds.includes(transactionId)) {
      toast.error("This transaction ID has already been used.");
      return;
    }

    // Verify the OCR text and compare it with the transaction ID and amount
    if (ocrText.includes(transactionId) && ocrText.includes(totalPrice.toString())) {
      setIsPaymentDone(true);
      setIsOcrVerified(true);
      toast.success("Payment confirmed! You can now submit the form.");
    } else {
      toast.error("Transaction ID or amount does not match. Please verify the details.");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPaymentImage(URL.createObjectURL(file));
      performOCR(file);
    }
  };

  const performOCR = (file) => {
    Tesseract.recognize(
      file,
      "eng", // Language
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setOcrText(text);
      console.log("OCR Result:", text); // Log the OCR result for debugging
    }).catch((error) => {
      console.error("OCR failed:", error);
      toast.error("Failed to extract text from image.");
    });
  };

  const handleInputChange = (index, field, value) => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    calculateTotalPrice();
  };

  const calculateTotalPrice = (updatedParticipants = participants) => {
    const filledCount = updatedParticipants.filter(
      (p) =>
        p.name && p.email && p.phone && p.age && p.collegeName && p.year && p.branch
    ).length;

    if (fixedPaymentAmount[eventname]) {
      setTotalPrice(fixedPaymentAmount[eventname]);
    } else if (perPersonPrice[eventname]) {
      setTotalPrice(filledCount * perPersonPrice[eventname]);
    }
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name.");
      return;
    }

    if (!isPaymentDone || !isOcrVerified) {
      toast.error("Please confirm and verify the payment before submitting.");
      return;
    }

    if (participants.some((p) => Object.values(p).some((v) => !v))) {
      toast.error("Please fill out all fields for all participants.");
      return;
    }

    if (eventname === "businessfair") {
      if (!stallType) {
        toast.error("Please select a stall type.");
        return;
      }

      if (!stallDetails.trim()) {
        toast.error("Please provide stall details.");
        return;
      }

      if (takenStallDetails.includes(stallDetails)) {
        toast.error("This stall detail is already taken. Please choose another.");
        return;
      }
    }

    const data = {
      groupId: Date.now().toString(),
      groupName,
      stallDetails,
      stallType,
      transactionId,
      totalPrice,
      electronicProducts,
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
      const response = await fetch(eventAPIs[eventname], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        throw new Error("Failed to submit data.");
      }
    } catch (error) {
      toast.error("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="participant-form">
      <h2>{eventname === "businessfair" ? "Business Fair" : "Event"} Registration</h2>

      <Form>
        <Form.Group>
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>

        {eventname === "businessfair" && (
          <>
            <Form.Group>
              <Form.Label>Stall Type</Form.Label>
              <Form.Control
                as="select"
                value={stallType}
                onChange={(e) => setStallType(e.target.value)}
              >
                <option value="">Select stall type</option>
                {Object.keys(stallTypeLimits).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Stall Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stall details"
                value={stallDetails}
                onChange={(e) => setStallDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
  <Form.Label>Electronic Products</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter electronic products you are bringing"
    value={electronicProducts}
    onChange={(e) => setElectronicProducts(e.target.value)}
  />
</Form.Group>
<h5>Already Taken Stall Details:</h5>
              <ul>
                {takenStallDetails.map((stall, index) => (
                  stall.stallType === stallType ?
                  <li key={index}>{stall.stallDetails}</li> : null
                ))}
              </ul>
          </>
        )}

        {participants.map((participant, index) => (
          <div key={index}>
            <h4>Participant {index + 1}</h4>
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
                type="text"
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
                type="text"
                placeholder="Enter year"
                value={participant.year}
                onChange={(e) => handleInputChange(index, "year", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter branch"
                value={participant.branch}
                onChange={(e) => handleInputChange(index, "branch", e.target.value)}
              />
            </Form.Group>
          </div>
        ))}

        <Form.Group>
          <Form.Label>Transaction ID</Form.Label>
          <Form.Control
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Upload Payment Proof</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageUpload}
          />
        </Form.Group>
        <div className="qr-code-section">
          <img src={qr} alt="Payment QR Code" />
          <p>Scan the QR code for payment</p>
        </div>
        <Button variant="primary" onClick={handlePaymentConfirmation}>
          Confirm Payment
        </Button>

        {isPaymentDone && (
          <Button variant="success" onClick={handleSubmit}>
            Submit Registration
          </Button>
        )}
      </Form>
    </div>
  );
}
