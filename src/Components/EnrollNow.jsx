import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import Tesseract from "tesseract.js";
import { useNavigate, useParams } from "react-router-dom";
import qr from "../Images/qr.jpg";
import "../CSS/EnrolNow.css";

const eventAPIs = {
  businessfair: "https://sheetdb.io/api/v1/bztbzd3842qtg",
  sparkstudio: "https://sheetdb.io/api/v1/q47bs88i70un3",
  ecoquiz: "https://sheetdb.io/api/v1/gzsa9kzk2svkv",
  miw: "https://sheetdb.io/api/v1/qn3zkb9qi9rwl",
  ppt: "https://sheetdb.io/api/v1/mx2irw7wdlozb",
  elocution: "https://sheetdb.io/api/v1/b8a6v109rt4ju",
  mastermissfiesta: "https://sheetdb.io/api/v1/60xy0e7ryr8xu",
  mystry: "https://sheetdb.io/api/v1/nzsex4qm4746a",
  seminar1: "https://sheetdb.io/api/v1/o6aq1fl2vjs4l",
  seminar2: "https://sheetdb.io/api/v1/al6wjwijgmpyf",
  seminar3: "https://sheetdb.io/api/v1/e315njaflvrm0",
  seminar4: "https://sheetdb.io/api/v1/p8fxxcoz709pj",
  seminar5: "https://sheetdb.io/api/v1/6v3c5qrc7avqj",
  seminar6: "https://sheetdb.io/api/v1/62j1lgbc8m4us",
};
const photoAPIs = {
  businessfair: "https://script.google.com/macros/s/AKfycbxQiXHJs-XxEFLyYq3orTYTsGbyAI-a9LBfz07vWliX03hTPzb3H9J3GzvmsAjUEtwT/exec",
  sparkstudio: "https://script.google.com/macros/s/AKfycbyGQ-gT_EsMroe3nOk5GaxZtqExZPHQ86ulOc1MG24iZUCICuDMOLp80KZ7c2jGvVSU/exec",
  ecoquiz: "https://script.google.com/macros/s/AKfycbzd-kIiLsfkDxpcXsG4yPDbSTdd-ppgVG4PDQ_d__kfXuYmapCg87t5m_SHjXiRUf9v/exec",
  miw: "https://script.google.com/macros/s/AKfycbwUdefKRC6fq4CopnRkGkOD2Ee7O1KmqRJaN15ybIHYFJEhRTpSLSeYAJFjQf462Iok/exec",
  ppt: "https://script.google.com/macros/s/AKfycbyKKnrDkcFaCi9BVv0gR5Iygho1M-Zr196JKMYNa3M_kmN4GANUMlpog9zUdkHXIkW4/exec",
  elocution: "https://script.google.com/macros/s/AKfycbwaHOOl_waFfQjTtxvmX6_vMCR2oUoej3m2rn42r7j8gXhVzARYxzRyF4Og12UmkJUh/exec",
  mastermissfiesta: "https://script.google.com/macros/s/AKfycbxjgFpj0gPWg1P9jhGcuktzVyRSCXx8iOLEW22vJughUY2O0tau45H2O0CJA67z4OMk/exec",
  mystry:" https://script.google.com/macros/s/AKfycbzUoBCscUecSuiH3rp_0rBhbB5hUO6jWynhbqF-FtyAWjyE3SA4T38D33bSNiAnKt1z/exec",
};

const perPersonPrice = {

};

const fixedPaymentAmount = {
  sparkstudio: 200,
  ppt: 100,
  mystry: 51,
  elocution: 100,
  ecoquiz: 100,
  mastermissfiesta: 100,
  miw: 100,
  businessfair: 911.00,
  businessfairfaculty:1200,
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
  mystry: 6,
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
  const [driveLink, setDriveLink] = useState("");
  const [groupName, setGroupName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [electronicProducts, setElectronicProducts] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [stallDetails, setStallDetails] = useState("");
  const [stallType, setStallType] = useState("Select Stall Type");
  const [takenStallDetails, setTakenStallDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ocrText, setOcrText] = useState("");
  const [isOcrVerified, setIsOcrVerified] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [stallUserType,setStallUserType]=useState(

  )
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
  const guardarArchivo = (e) =>{
    var file = e.target.files[0] //the file
    performOCR(file);
    var reader = new FileReader() //this for convert to Base64 
    reader.readAsDataURL(e.target.files[0]) //start conversion...
    reader.onload = function (e) { //.. once finished..
      var rawLog = reader.result.split(',')[1]; //extract only thee file data part
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      fetch(photoAPIs[eventname], //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
        .then(res => res.json()).then((a) => {
          setDriveLink(a.url) //save the link to state
        }).catch(e => console.log(e)) // Or Error in console
    }}

  const fetchTakenStalls = async () => {
    try {
      const response = await fetch(eventAPIs[eventname]);
      const data = await response.json();
      const foodStalls = data.filter(entry => entry.stallType === "food" || "service" || "games" || "other"); // Filter for food stalls
      const stalls = foodStalls.map((entry) => entry);
      setTakenStallDetails(stalls);
    } catch (error) {
      // console.error("Error fetching taken food stalls:", error);
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
      // console.error("Error fetching existing transaction IDs:", error);
    }
  };

  const handlePaymentConfirmation = () => {
    if (!transactionId.trim() ) {
      toast.error("Please complete payment details.");
      return;
    }

  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
  
    setPaymentImage(URL.createObjectURL(file)); // Preview the image
    performOCR(file); // Optional OCR processing
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const rawLog = reader.result.split(',')[1];
        const dataSend = {
          dataReq: { data: rawLog, name: file.name, type: file.type },
          fname: "uploadFilesToGoogleDrive",
        };
  
        const response = await fetch(photoAPIs[eventname], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataSend),
        });
  
        const result = await response.json();
        // console.log(result); // Handle the response
      } catch (error) {
        // console.error("Error uploading file:", error);
        toast.error("File upload failed.");
      }
    };
  
    reader.onerror = () => {
      toast.error("Error reading file.");
    };
  };
  

  const performOCR = (file) => {
    Tesseract.recognize(
      file,
      "eng", // Language
      {
        logger: (m) => console.log(m), // Log progress for debugging
      }
    ).then(({ data: { text } }) => {
      setOcrText(text); // Store the entire OCR text
      // console.log("OCR Result:", text); // Log the OCR result for debugging
  
      // Extract the UPI transaction ID from the OCR text
      const upiTransactionId = extractTransactionId(text);
      if (upiTransactionId && !existingTransactionIds.includes(upiTransactionId) ) {
        setTransactionId(upiTransactionId); // Auto-fill the transaction ID field
        toast.success("Transaction ID detected and auto-filled.");
        setIsPaymentDone(true);
      setIsOcrVerified(true);
      } else {
        toast.error("Failed to extract UPI transaction ID from the image.");
      }
    }).catch((error) => {
      // console.error("OCR failed:", error);
      toast.error("Failed to extract text from image.");
    });
  };
  
  const extractTransactionId = (text) => {
    // Regular expression to match UPI transaction ID pattern (example pattern)
    const transactionIdPattern = /\b\d{12}\b/g; // Adjust the pattern as per actual UPI transaction ID format
    const match = text.match(transactionIdPattern);
    return match ? match[0] : null; // Return the first match if available
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
    // Debugging: Log the updated participants
    // console.log("Updated Participants Array: ", updatedParticipants);
  
    // Count participants with all required fields filled
    const filledCount = updatedParticipants.filter((p) => {
      // Check each field individually and log the result
      const nameFilled = p.name?.trim();
      const emailFilled = p.email?.trim();
      const phoneFilled = p.phone?.trim();
      const ageFilled = p.age?.trim();
      const collegeNameFilled = p.collegeName?.trim();
      const yearFilled = p.year?.trim();
      const branchFilled = p.branch?.trim();
    
    
      const isFilled =
        nameFilled && emailFilled && phoneFilled && ageFilled && collegeNameFilled && yearFilled && branchFilled;
    
    
      return isFilled;
    }).length;
    
    // console.log('Filled count:', filledCount);
        
    
    // console.log('Filled count:',); // Log the final count
    
    // // Debugging: Log the filled count
    // console.log("Filled Count: ", filledCount);
  
    // Calculate total price based on fixed or per-person pricing
    if (fixedPaymentAmount[eventname]) {
      if (stallUserType === "Faculty") {
        setTotalPrice(fixedPaymentAmount.businessfairfaculty);
      }
      else{
      setTotalPrice(fixedPaymentAmount[eventname]);
      }
    } else if (perPersonPrice[eventname]) {
      setTotalPrice(filledCount * perPersonPrice[eventname]);
    }
  };
  
  useEffect(() => {
    calculateTotalPrice(participants);
  }, [participants]); // Recalculate price when participants change
  

  const handleSubmit = async () => {
    // if (!groupName.trim()) {
    //   toast.error("Please enter a group name.");
    //   return;
    // }

    // if (!isPaymentDone || !isOcrVerified) {
    //   toast.error("Please confirm and verify the payment before submitting.");
    //   return;
    // }

    // if (participants.some((p) => Object.values(p).some((v) => !v))) {
    //   toast.error("Please fill out all fields for all participants.");
    //   return;
    // }

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
if (eventname === "seminar1" || eventname === "seminar2" || eventname === "seminar3" || eventname === "seminar3" || eventname === "seminar4" || eventname === "seminar5" || eventname === "seminar6"){
  setIsPaymentDone(true);
  setIsOcrVerified(true);
  setTransactionId(0);
  setPaymentImage("")
}
    const data = {
      groupId: Date.now().toString(),
      groupName,
      stallDetails,
      driveLink,
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
console.log(response);
      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        throw new Error("Failed to submit data.");
        // console.log(error);
      }
    } catch (error) {
      toast.error("Error submitting data. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="participant-form container mt-5">
      <h2>{eventname === "businessfair" ? "Business Fair" : "Event"} Registration</h2>

      <Form>
        <Form.Group>
        {eventLimits > 1 &&(
          
          <><Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          </>
          )}
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
              <Form.Label>Select Any One </Form.Label>
              <Form.Control
                as="select"
                value={stallUserType}
                onChange={(e) => setStallUserType(e.target.value)}
              >
                <option value="">Select Option</option>
                 <option>Student</option>
                 <option>Faculty</option>
                
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
  <Form.Label>Electronic Products(Must bring your own extensiob board)</Form.Label>
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
              {eventname === "mastermissfiesta" || eventname === "miw" || eventname === "seminar1" || eventname === "seminar2" || eventname === "seminar3" || eventname === "seminar3" || eventname === "seminar4" || eventname === "seminar5" || eventname === "seminar6"?<>
                <Form.Label>College Name</Form.Label>
              <Form.Control
                type="Fixed"
                readOnly
                placeholder="Thakur Polytechnic"
                value={participant.collegeName}
                onChange={(e) => handleInputChange(index, "collegeName", e.target.value)}
              />
              </>:<>
              <Form.Label>College Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter college name"
                value={participant.collegeName}
                onChange={(e) => handleInputChange(index, "collegeName", e.target.value)}
              />
              </>}
              
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
  {eventname && (
    <>
      <Form.Label>Branch</Form.Label>
      {eventname !== "seminar1" && eventname !== "seminar2" && eventname !== "seminar3" && eventname !== "seminar4" && eventname !== "seminar5" && eventname !== "seminar6" && (
        <Form.Control
          type="text"
          placeholder="Enter branch"
          value={participant.branch}
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
      {eventname === "seminar1" && (
        <Form.Control
          type="text"
          placeholder="Branch"
          value="Computer Engineering"
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
      {eventname === "seminar2" && (
        <Form.Control
          type="text"
          placeholder="Branch"
          value="Mechanical Engineering"
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
      {eventname === "seminar3" && (
        <Form.Control
          type="text"
          placeholder="Branch"
          value="Electronics & Telecommunication"
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
      {eventname === "seminar4" && (
        <Form.Control
          type="text"
          placeholder="Branch"
          value="Mechanical Engineering"
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
      {eventname === "seminar5" && (
        <Form.Control
          type="text"
          placeholder="Branch"
          value="Civil Engineering"
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
      {eventname === "seminar6" && (
        <Form.Control
          type="text"
          placeholder="Branch"
          value="TSEC"
          onChange={(e) => handleInputChange(index, "branch", e.target.value)}
        />
      )}
    </>
  )}
</Form.Group>

            {/* <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
              <Form.Label>Branch</Form.Label>
              <Form.Control 
              
                type="text"
                placeholder="Enter branch"
                value={participant.branch}
                onChange={(e) => handleInputChange(index, "branch", e.target.value)}
              />
            </Form.Group> */}
          </div>
        ))}
        {eventname === "seminar1" || eventname === "seminar2" || eventname === "seminar3" || eventname === "seminar3" || eventname === "seminar4" || eventname === "seminar5" || eventname === "seminar6"?
        <>
        <Form.Group>
          <Form.Control
          type="Fixed"
          value={totalPrice}
          // onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter transaction ID"
        />
        </Form.Group>
          <Button variant="success" onClick={handleSubmit}>
            Submit Registration
          </Button>
   </>
          :
          <>
        <Form.Group>

          <Form.Label>Payable amount </Form.Label>
        {stallUserType === "Faculty" ?<>
          {/* console.log(stallUserType) */}
            <Form.Control
            type="Fixed"
            value={fixedPaymentAmount.businessfairfaculty}
            // onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
          />
          </>
          :
          <Form.Control
          type="Fixed"
          value={totalPrice}
          // onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter transaction ID"
        />
          }
        </Form.Group>
        <Form.Group>
  <Form.Label>Transaction ID</Form.Label>
  <Form.Control
    type="text"
    value={transactionId}
    readOnly // Make the field read-only
    placeholder="Auto-detected transaction ID"
    style={{ backgroundColor: "#e9f5e9" }} // Optional: Add a highlight
  />
  <Form.Text className="text-muted">
    This field is auto-detected and cannot be edited.
  </Form.Text>
</Form.Group>
        <Form.Group>
          <Form.Label>Upload Payment Proof</Form.Label>
          <Form.Control
            type="file"
            onChange={guardarArchivo}
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
          </>
}
       
      </Form>
    </div>
  );
}
//if it is semnar so no payment option and  according to seminar put a fix branch name on branch section also put fix thakur Polytechnic fix in mass & miss fiesta ,seminars  