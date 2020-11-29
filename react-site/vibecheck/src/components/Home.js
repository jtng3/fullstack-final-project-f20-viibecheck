import React, { useState } from "react";
import { Button, Modal, Jumbotron } from "react-bootstrap";
import Quiz from "./Quiz";
import "./Home.css";

function Home(props) {
  const [quizOpen, setQuizOpen] = useState(false);

  function openQuiz() {
    setQuizOpen(true);
  }
  function closeQuiz() {
    setQuizOpen(false);
  }
  return (
    <Jumbotron className="jumbotron-custom-light">
      <div className="row">
        <div className="col-8">
          <h1 className="row m-2">What is Consent?</h1>
          <p className="row m-3">Take our short quiz today!</p>
          <p className="row m-2">
            <Button className="col-3 m-1" variant="primary" onClick={openQuiz}>
              Take the Quiz
            </Button>
            <Button
              className="col-4 m-1"
              variant="outline-secondary "
              value="About"
              onClick={props.pageSelection}
            >
              Learn More On Consent
            </Button>

            <Modal show={quizOpen} onHide={closeQuiz}>
              <Modal.Header closeButton>
                <Modal.Title>Consent Quiz</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Quiz />
              </Modal.Body>
            </Modal>
          </p>
        </div>
        <div class="col-3">
          <div class="thumbnail">
            <a href="https://i.pinimg.com/originals/60/57/7f/60577fc75851f253eb9c99fbab47690a.jpg">
              <img
                className="w-100"
                src="https://i.pinimg.com/originals/60/57/7f/60577fc75851f253eb9c99fbab47690a.jpg"
                alt="F.R.I.E.S"
                rounded
                fluid
              />
            </a>
          </div>
        </div>
      </div>
    </Jumbotron>
  );
}

export default Home;
