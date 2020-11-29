import React from "react";
import { Form } from "react-bootstrap";
import detailTypes from "./detailTypes";
import "./Details.css";

function Details(props) {
  return (
    <Form.Group id="detailsContainer">
      <Form.Label htmlFor="location" id="stateLabel">
        Details (select all that apply):
      </Form.Label>
      {detailTypes.map((detailType, index) => (
        <div key={index}>
          {/*           <label>
            <input
              className="chk-btn mr-2"
              type="checkbox"
              name={detailType.id}
              onChange={props.updateDetails}
            />
            {detailType.content}
          </label> */}
          <input
            type="checkbox"
            className="chk-btn"
            id={detailType.id}
            name={detailType.id}
            onChange={props.updateDetails}
          />
          <label className="w-100" htmlFor={detailType.id}>{detailType.content}</label>
        </div>
      ))}
    </Form.Group>
  );
}

export default Details;
