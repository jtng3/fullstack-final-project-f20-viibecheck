import "./Form.css";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import LocationSelect from "./form-components/LocationSelect";
import Name from "./form-components/Name";
import Phone from "./form-components/Phone";
import Year from "./form-components/Year";
import WorkSchool from "./form-components/WorkSchool";

/* class VibeForm extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {name: '', location: '', phone: '',response : ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  } */
function VibeForm() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [location, setLocation] = useState("AL");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [work, setWork] = useState("hello");
  const [school, setSchool] = useState("world");

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
  function updateYear(event) {
    setYear(event.target.value);
  }
  function updateWork(event) {
    setWork(event.target.value);
  }
  function updateSchool(event) {
    setSchool(event.target.value);
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
        phone +
        "\nIncident Year: " +
        year +
        "\nWork Related: " +
        work +
        "\nSchool Related: " +
        school
    );
    event.preventDefault();

    const report = {
      fName: fName,
      lName: lName,
      state: location,
      phone: phone,
      year: year,
      work: work,
      school: school,
    };

    axios.post("http://localhost:8080/createperp", { report }).then(
      (res) => {
        this.setState({ response: res.data });
        alert(this.state.response);
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

          <div class="col">
            <Year updateYear={updateYear} />
          </div>
        </div>

        <WorkSchool updateWork={updateWork} updateSchool={updateSchool} />

        <Button id="submit" type="submit" value="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VibeForm;

