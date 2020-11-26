import React from "react";
import { Form } from "react-bootstrap";

function WorkSchool(props) {
  return (
    <Form.Group id="workAndSchoolContainer">
      <div class="form-row">
        <div class="col">
          <Form.Label for="work">Work Related? </Form.Label>
          <Form.Control
            as="select"
            id="workSelect"
            name="work"
            onchange={props.updateWork}
            required
          >
            <option selected />
            <option value="test"></option>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </Form.Control>
        </div>

        <div class="col">
          <Form.Label for="school">School Related? </Form.Label>
          <Form.Control
            as="select"
            id="schoolSelect"
            name="school"
            onchange={props.updateSchool}
            required
          >
            <option value="test" />
            <option value="no">no</option>
            <option value="yes">yes</option>
          </Form.Control>
        </div>
      </div>
    </Form.Group>
  );
}

export default WorkSchool;
