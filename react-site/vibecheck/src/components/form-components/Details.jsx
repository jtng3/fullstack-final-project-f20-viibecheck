import React from "react";
import { Form } from "react-bootstrap";
import detailTypes from "./detailTypes";

function Details(props) {

  return (
    <Form.Group id="detailsContainer">
      <Form.Label htmlFor="location" id="stateLabel">
        Details (select all that apply):
      </Form.Label>
      {detailTypes.map((detailType, index) => (
        <div key={index}>
          <input
            className="mr-2"
            type="checkbox"
            name={detailType.id}
            onChange={props.updateDetails}
          />
          <label>{detailType.content}</label>
        </div>
      ))}
    </Form.Group>
  );
}

export default Details;
