import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import "../CSS/EventD.css";
import eventdata from "../Data.json";

export default function EventDetails() {
  const Navigate = useNavigate();
  const param = useParams().eventname;
  const [showModal, setShowModal] = useState(false); // Manage modal visibility

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleRuleClick = () => {
    const ruleLink = eventdata[param].Rule;
    if (ruleLink.includes("drive.google.com")) {
      window.open(ruleLink, "_blank"); // Open the Google Drive link in a new tab
    } else {
      handleModalShow(); // Show the modal if it's not a Google Drive link
    }
  };

  return (
    <Container className="mt-4 event-container">
      <Row className="justify-content-center">
        <Col md={8} className="event-info mb-4">
          <Image
            src={require(`../Images/${eventdata[param].image}`)} // Using require for dynamic image paths
            alt={eventdata[param].EventName}
            fluid
            className="event-image"
          />

          <Card className="p-3 mt-7 shadow event-details" style={{ borderRadius: "15px" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{eventdata[param].EventName}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Fee: {eventdata[param].Fee}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Date: {eventdata[param].Date}</h4>
                </ListGroup.Item>
              <ListGroup.Item>
                <p>{eventdata[param].Description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center">
          <Card className="p-3 text-center shadow action-card" style={{ borderRadius: "10px" }}>
            <Button
              variant="primary"
              onClick={() => Navigate(`/eventdetails/${param}/enrollnow`)}
              className="mb-3 register-btn"
            >
              Register Participants
            </Button>
            {eventdata[param].Rule && (
              <Button
                variant="secondary"
                onClick={handleRuleClick} // Handle Rule Book button click
                className="rulebook-btn w-100"
              >
                Rule Book
              </Button>
            )}
          </Card>
        </Col>
      </Row>

      {/* Modal for displaying the Rule Book */}
      <Modal show={showModal} onHide={handleModalClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Rule Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="Rule Book"
            src={eventdata[param].Rule} // Direct link to the Rule Book
            style={{ width: "100%", height: "60vh" }}
            allowFullScreen
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
