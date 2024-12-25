
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// import axios from "axios";
import {
  Button,
  Modal,
  
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  
} from "react-bootstrap";
import "../CSS/Events.css";
// import { FaBook } from "react-icons/fa";
// import toast from "react-hot-toast";
import iicLogo from "../Images/iicLogo.png"
import eventdata from "../Data.json"



export default function EventDetails() {

    const Navigate=useNavigate();
    const param=useParams().eventname

    return (
      <Container className="mt-4 event-container">
        <Row className="justify-content-center">
          <Col md={8} className="event-info mb-4">
            <Image
              src={iicLogo}
              alt={"......."}
              fluid
              className="event-image"
            />
            <Card className="p-3 mt-4 shadow event-details" style={{borderRadius:"15px"}}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{eventdata[param].EventName}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Fee: {eventdata[param].Fee}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>{eventdata[param].Description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-center">
            <Card className="p-3 text-center shadow action-card" style={{borderRadius:"10px"}}>
              <Button
                variant="primary"
                onClick={()=>Navigate(`/eventdetails/${param}/enrollnow`)}
                className="mb-3 register-btn"
                style={{borderRadius:"20px"}}
              >
                Register Participants
              </Button>
                {true &&
                <a href={`https://drive.google.com/file/d/`} style={{width:"100%"}}>
                  <Button variant="secondary" className="rulebook-btn w-100">  
                    {/* <FaBook className="me-2" /> */}
                    Rule Book
                  </Button>
                  </a>
                }
            </Card>
          </Col>
        </Row>
        <Modal show={false} style={{height:""}} centered size="lg">
        <div style={{height:"50rem",border:"2px solid red"}}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body style={{height:"83%"}}>
            <iframe
              title="Google Drive PDF"
              src={`https://drive.google.com/file/d/119hiywrd_vKWtiPH-_WHtdFt7-qKsT8w/preview`}
              style={{width:"100%",height:"100%"}}
              allowFullScreen
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">
              Close
            </Button>
          </Modal.Footer>
      </div>
        </Modal>
      </Container>
    );
}
