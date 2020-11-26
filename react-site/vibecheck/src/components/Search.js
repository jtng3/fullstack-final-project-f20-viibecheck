import "./Form.css";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import LocationSelect from "./form-components/LocationSelect";
import Name from "./form-components/Name";
import Phone from "./form-components/Phone";



function Search() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [location, setLocation] = useState("AL");
  const [phone, setPhone] = useState("");

  function updateFName(event) {
    setFName(event.target.value);
  }
  function updateLName(event) {
    setLName(event.target.value);
  }
  function updateLocation(event) {
    setLocation(event.target.value);
  }
  function updatePhone(event) {
    setPhone(event.target.value);
  }
  
  function handleSubmit(event) {
    alert(
      "First Name: " +
        fName +
        "\nLast Name: " +
        lName +
        "\nIncident Location(State): " +
        location +
        "\nPhone: " +
        phone 
    );
    event.preventDefault();

    const search = {
      fName: fName,
      lName: lName,
      state: location,
      phone: phone,
    };

    axios.post("http://localhost:8080/search", { search }).then(
      (res) => {
        //alert(res.data);
        res.data.forEach(element => {
          alert(element.fname +',' + element.lname+','+ element.state +','+ element.phone +','+ element.year + ',' + element.work + ',' + element.school);
        });
      },
      (err) => {
        alert(err);
      }
    );
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Name updateFName={updateFName} updateLName={updateLName} />

        <div class="form-row">
          <div class="col-2">
          <LocationSelect updateLocation={updateLocation} />
          </div>
          <div class="col">
            <Phone updatePhone={updatePhone} />
          </div>
        </div>
        <Button id="submit" type="submit" value="Submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Search;

