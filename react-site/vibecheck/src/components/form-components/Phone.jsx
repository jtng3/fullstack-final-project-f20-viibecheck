import React from "react";
import { Form } from "react-bootstrap";

function Phone(props) {
  return (
            <Form.Group id="phoneContainer">
              <Form.Label for="phone">Phone (xxx-xxx-xxxx):</Form.Label>
              <Form.Control
                onChange={props.updatePhone}
                type="tel"
                id="phone"
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              ></Form.Control>
            </Form.Group>
  );
}

export default Phone;