import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import Tesseract from "tesseract.js";  // Import Tesseract.js
import { useNavigate, useParams } from "react-router-dom";
import qr from "../Images/qr.jpg"

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
  businessfair: 911,
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

export default function ParticipantForm() {
  const [participants, setParticipants] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(true);
  const [stallDetails, setStallDetails] = useState("");
  const [eventLimitReached, setEventLimitReached] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ocrText, setOcrText] = useState("");
  const [isOcrVerified, setIsOcrVerified] = useState(false);
  const [electronicsDevices, setElectronicsDevices] = useState("");  // For capturing electronic devices
  const navigate = useNavigate();
  const { eventname } = useParams();

  useEffect(() => {
    initializeParticipants();
    // checkEventLimit();
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

  const handleInputChange = (index, field, value) => {
    // Update only the field of the participant at the specified index
    setParticipants((prevParticipants) => {
      const updatedParticipants = [...prevParticipants];  // create a shallow copy
      updatedParticipants[index] = {
        ...updatedParticipants[index],  // copy the current participant data
        [field]: value,  // update the specific field
      };
      return updatedParticipants;  // return the updated participants array
    });
  
    // Optionally, recalculate the total price if needed
    calculateTotalPrice();
  };
  
    const calculateTotalPrice = (updatedParticipants) => {
    const filledCount = updatedParticipants.filter(p => p.name && p.email && p.phone && p.age && p.collegeName && p.year && p.branch).length;
    if (fixedPaymentAmount[eventname] !== undefined) {
      setTotalPrice(fixedPaymentAmount[eventname]);
    } else if (perPersonPrice[eventname] !== undefined) {
      setTotalPrice(filledCount * perPersonPrice[eventname]);
    }
  };

  const handlePaymentConfirmation = () => {
    if (!transactionId.trim() || !paymentImage) {
      toast.error("Please complete payment details.");
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

  

  // Add this function to check for duplicate participants
const checkDuplicateParticipants = (participants) => {
  const participantDetails = participants.map((p) => ({
    email: p.email,
    phone: p.phone,
  }));

  const duplicates = participantDetails.filter(
    (p, index, self) =>
      index !== self.findIndex((t) => t.email === p.email || t.phone === p.phone)
  );

  return duplicates.length > 0;
};

const handleSubmit = async () => {
  if (!groupName.trim()) {
    toast.error("Please enter a group name.");
    return;
  }

  if (participants.some((p) => Object.values(p).some((v) => !v))) {
    toast.error("Please fill out all fields for all participants.");
    return;
  }

  // Check for duplicates
  if (checkDuplicateParticipants(participants)) {
    toast.error("Duplicate participants found! Please ensure all participants have unique email or phone.");
    return;
  }

  if (!isPaymentDone || !isOcrVerified) {
    toast.error("Please confirm and verify the payment before submitting.");
    return;
  }

  if (!stallDetails.trim()) {
    toast.error("Please provide stall details.");
    return;
  }

  const data = {
    groupId: Date.now().toString(),
    groupName,
    stallDetails,
    transactionId,
    totalPrice,
    electronicsDevices,  // Add the electronics devices info if Business Fair
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      toast.success("Registration successful!");
      resetForm();
      navigate("/");
    } else {
      throw new Error("Failed to submit data.");
    }
  } catch (error) {
    toast.error("Error submitting data. Please try again.");
  }
};

  const resetForm = () => {
    setParticipants([]);
    setGroupName("");
    setTransactionId("");
    setPaymentImage(null);
    setIsPaymentDone(false);
    setStallDetails("");
    setTotalPrice(0);
    setElectronicsDevices("");  // Reset electronics devices
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
          <Form.Group>
            <Form.Label>Electronic Devices to be Used</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter details of electronic devices"
              value={electronicsDevices}
              onChange={(e) => setElectronicsDevices(e.target.value)}
            />
        
            <Form.Label>Stall Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter stall details"
              value={stallDetails}
              onChange={(e) => setStallDetails(e.target.value)}
            />
          </Form.Group>
        )}

{participants.map((participant, index) => (
  <div key={index}>
    <h5>Participant {index + 1}</h5>
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter participant name"
        value={participant.name || ""}  // Ensure this binds to the participant's name
        onChange={(e) => handleInputChange(index, "name", e.target.value)} // Pass correct index
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter participant email"
        value={participant.email || ""}
        onChange={(e) => handleInputChange(index, "email", e.target.value)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Phone</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter participant phone"
        value={participant.phone || ""}
        onChange={(e) => handleInputChange(index, "phone", e.target.value)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Age</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter participant age"
        value={participant.age || ""}
        onChange={(e) => handleInputChange(index, "age", e.target.value)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>College Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter college name"
        value={participant.collegeName || ""}
        onChange={(e) => handleInputChange(index, "collegeName", e.target.value)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Year</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter participant year"
        value={participant.year || ""}
        onChange={(e) => handleInputChange(index, "year", e.target.value)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Branch</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter participant branch"
        value={participant.branch || ""}
        onChange={(e) => handleInputChange(index, "branch", e.target.value)}
      />
    </Form.Group>
  </div>
))}



        <Form.Group>
          <Form.Label>Payment Transaction ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Upload Payment Receipt</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
        </Form.Group>

        <Button onClick={handlePaymentConfirmation} variant="success">Confirm Payment</Button>

        <div className="qr-code-section">
          <img src={qr} alt="Payment QR Code" />
          <p>Scan the QR code for payment</p>
        </div>

        <div>Total Price: ₹{totalPrice}</div>

        <Button onClick={handleSubmit} variant="primary">Submit Registration</Button>
      </Form>
    </div>
  );
}
