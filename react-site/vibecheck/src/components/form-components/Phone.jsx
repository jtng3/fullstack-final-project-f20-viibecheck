import React from "react";
import { Form } from "react-bootstrap";

// For formatting phone number input
// https://www.npmjs.com/package/react-phone-number-input
import PhoneInput from "react-phone-number-input/input";

function Phone(props) {

  return (
    <Form.Group id="phoneContainer">
      <PhoneInput
        className="form-control mb-3"
        country="US"
        placeholder=" Phone"
        value={props.phone}
        onChange={props.setPhone}
        id="phone"
        name="phone"
        pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
      />
    </Form.Group>
  );
}

export default Phone;

/*             <Form.Group id="phoneContainer">
              <Form.Label htmlFor="phone">Phone (xxx-xxx-xxxx):</Form.Label>
              <Form.Control
                onChange={props.updatePhone}
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone (XXX-XXX-XXXX)"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              ></Form.Control>
</Form.Group> */
