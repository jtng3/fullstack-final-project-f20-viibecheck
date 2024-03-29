import React from "react";
import { Form } from "react-bootstrap";

function Year(props) {
  return (
            <Form.Group id="yearContainer">
{/*               <Form.Label htmlFor="year" id="yearLabel">
                Incident Year (XXXX):
              </Form.Label> */}
              <Form.Control
                onChange={props.updateYear}
                type="text"
                name="year"
                id="yearInput"
                placeholder="Incident Year (YYYY)"
                pattern="[0-9]{4}"
                required
              ></Form.Control>
            </Form.Group>

  );
}

export default Year;
