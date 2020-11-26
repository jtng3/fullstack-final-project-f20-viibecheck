import React from "react";
import { Form } from "react-bootstrap";

function Name(props) {
  return (
        <Form.Group id="nameContainer">
          <div class="form-row">
            <div class="col">
              <Form.Label for="fName">First Name:</Form.Label>
              <Form.Control
                onChange={props.updateFName}
                type="text"
                name="fName"
                id="fNameInput"
                placeholder="First Name"
              ></Form.Control>
            </div>
            <div class="col">
              <Form.Label for="lName">Last Name:</Form.Label>
              <Form.Control
                onChange={props.updateLName}
                type="text"
                name="lName"
                id="lNameInput"
                placeholder="Last Name"
              ></Form.Control>
            </div>
          </div>
        </Form.Group>

  );
}

export default Name;
