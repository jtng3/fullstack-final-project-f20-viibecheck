import React from "react";
import { Form } from "react-bootstrap";

function Name(props) {
  return (
        <Form.Group id="nameContainer">
          <div className="form-row mt-4 mb-4">
            <div className="col-md mt-1">
{/*               <Form.Label htmlFor="fName">First Name:</Form.Label> */}
              <Form.Control
                onChange={props.updateFName}
                type="text"
                name="fName"
                id="fNameInput"
                placeholder="First Name"
              ></Form.Control>
            </div>
            <div className="col-md mt-1">
{/*               <Form.Label htmlFor="lName">Last Name:</Form.Label> */}
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
