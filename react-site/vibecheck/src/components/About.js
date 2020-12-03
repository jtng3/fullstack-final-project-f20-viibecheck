import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";
import Quiz from "./Quiz";

function About(){
    const [quizOpen, setQuizOpen] = useState(false)

    function openQuiz() {
        setQuizOpen(true);
    }
    function closeQuiz() {
        setQuizOpen(false);
    }

    return (
        <Card id="text-card">
          <Card.Body>
            <Card.Title>About &nbsp;&nbsp; v i i b e c h e c k</Card.Title>
            <Card.Text>
              Viibecheck is our final project for CS 465P.
              <br />
              It was created by Michael Jenkins, Nhan Le, and Jaeger Tang.
              <br />
              <br />
              Consent is an often overlooked issue in our society, and
              accusations of harrassment and assault all too often go unheard,
              causing problematic people to continue unopposed.
              <br />
              <br />
              Vibecheck was created to play a small role in remedying this. If
              someone has made you feel unsafe or harmed you in some manner,
              their basic information can be submitted to our database.
              <br />
              <br />
              If you have concerns about an upcoming date or a new roommate, you
              can use their information to search our database and we'll let you
              know whether they appear in it and a general idea of how many
              reports there have been.
              <br />
              <br />
              If you submit a report, we don't collect or store any information
              about you, it is fully anonymous for your protection.
              <br />
              <br />
              As a consequence, reports cannot be verified.
              <br />
              <br />
              <Button variant="outline-secondary" onClick={openQuiz}>
                Take the Consent Quiz
              </Button>
              <Modal show={quizOpen} onHide={closeQuiz}>
                <Modal.Header closeButton>
                  <Modal.Title>Consent Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Quiz />
                </Modal.Body>
              </Modal>
            </Card.Text>
          </Card.Body>
        </Card>
    )
}

export default About;