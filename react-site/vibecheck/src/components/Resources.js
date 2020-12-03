import React from "react";
import { Card } from "react-bootstrap";
import "./Resources.css";

function Resources() {
  return (
    <Card id="text-card">
      <Card.Body>
        <div className="mt-1" id="alert911">
          <h5>If you are in immediate danger, please call 911</h5>
        </div>

        <div className="mt-4">
          <Card.Title>Resources</Card.Title>
          <Card.Text>
            <a id="resourceLink" href="https://www.rainn.org/">
              RAINN
            </a>
            <p>
              The nation's largest anti-sexual violence organization. They
              operate the National Sexual Assault Hotline, 800-656-HOPE
            </p>

            <a
              id="resourceLink"
              href="https://www.plannedparenthood.org/learn/relationships/sexual-consent"
            >
              Planned Parenthood
            </a>
            <p>
              Planned Parenthood delivers vital reproductive health care, sex
              education, and information to millions of people worldwide.{" "}
            </p>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Resources;
