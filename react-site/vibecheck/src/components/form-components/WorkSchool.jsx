import React from "react";
import { Form } from "react-bootstrap";

function WorkSchool(props) {
  return (
    <Form.Group id="workAndSchoolContainer">
      <div className="form-row">
        <div className="col">
          <Form.Label htmlFor="work">Work Related? </Form.Label>
          <Form.Control
            as="select"
            id="workSelect"
            name="work"
            onChange={props.updateWork}
            required
          >
            <option value=""></option>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </Form.Control>
        </div>

        <div className="col">
          <Form.Label htmlFor="school">School Related? </Form.Label>
          <Form.Control
            as="select"
            id="schoolSelect"
            name="school"
            onChange={props.updateSchool}
            required
          >
            <option value=""></option>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </Form.Control>
        </div>
      </div>
    </Form.Group>
  );
}

export default WorkSchool;
