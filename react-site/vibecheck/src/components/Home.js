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
        <div className="col-lg-1" />
        <div className="col-lg-6">
          <h1 className="row m-2 font-weight-bold font-italic">
            What is Consent?
          </h1>
          
          <p className="row m-3">Take our short quiz today!</p>
          <p className="row m-2">
            <Button
              className="col-md-4 m-1"
              variant="primary"
              onClick={openQuiz}
            >
              Take the Quiz
            </Button>
            <Button
              className="col-md-6 m-1"
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
        <div className="col-lg-5 image">
          <img
            className="fries"
            src="https://i.pinimg.com/originals/60/57/7f/60577fc75851f253eb9c99fbab47690a.jpg"
            alt="F.R.I.E.S"
            rounded="true"
            fluid="true"
          />
          <div className="caption"> Credit: @catharsisproductions</div>
        </div>
      </div>
    </Jumbotron>
  );
}

export default Home;
