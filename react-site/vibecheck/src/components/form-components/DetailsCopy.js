import React from "react";
import { Form } from "react-bootstrap";
import detailTypes from "./detailTypes"

function Details(props) {



    console.log(detailTypes)


  return (
    <Form.Group id="detailsContainer">
      <Form.Label for="location" id="stateLabel">
        Details (select all that apply):
      </Form.Label>
      <div class="details">
        <input
          onChange={props.updateDetails}
          type="checkbox"
          class="details-option"
          id="details-1"
          value="Making conditions of employment or advancement dependent on sexual favors, either explicitly or implicitly."
        />
        <label class="details-option-label p-20px" for="details-1">
          Making conditions of employment or advancement dependent on sexual
          favors, either explicitly or implicitly.
        </label>
        <br />
        <input
          onChange={props.updateDetails}
          type="checkbox"
          class="details-option"
          id="details-1"
          value="Physical acts of sexual assault."
        />
        <label class="details-option-label p-20px" for="details-1">
          Physical acts of sexual assault.
        </label>
      </div>
    </Form.Group>
  );
}

export default Details;
