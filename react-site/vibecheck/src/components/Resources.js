import React from "react";
import { Card } from "react-bootstrap";
import "./Resources.css";

function Resources(){

    return (
        <Card id="text-card">
            <Card.Body>
            <div id="alert911">
                <h5>If you are in immediate danger, please call 911</h5>
            </div>
            <Card.Title>Resources</Card.Title>
            <Card.Text>
                <a id="resourceLink" href="https://www.rainn.org/">RAINN</a>
                <p>The nation's largest anti-sexual violence organization. They operate the National Sexual Assault Hotline, 800-656-HOPE</p>
            </Card.Text>
          </Card.Body>
        </Card>
    )
}

export default Resources;