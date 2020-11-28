import "./Form.css";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import LocationSelect from "./form-components/LocationSelect";
import Name from "./form-components/Name";
import Phone from "./form-components/Phone";
import Year from "./form-components/Year";
import WorkSchool from "./form-components/WorkSchool";
import Details from "./form-components/Details";

/* class VibeForm extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {name: '', location: '', phone: '',response : ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  } */

//for some reason this has to be in the upper scope, which I am not sure I like.
let checkedDetails = [];
function VibeForm() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [location, setLocation] = useState("AL");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [work, setWork] = useState("hello");
  const [school, setSchool] = useState("world");
  const [details, setDetails] = useState("");

  //instead of here
  //var checkedDetails = [];

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
  function updateDetails(e) {
    const value = e.target.name;
    //console.log("Old checkedDetails: " + checkedDetails);
    //console.log("checked is: " + e.target.checked) 
    if (e.target.checked) {
      console.log("push value is: " + value)
      checkedDetails.push(value);
      console.log("pushed")
    } else {
      console.log("remove value is: " + value)
      const index = checkedDetails.indexOf(value);
      console.log("remove index is: " + index)
      if (index > -1) {
        checkedDetails.splice(index, 1);
        console.log("spliced")
      }
    }
    //console.log("New checkedDetails: " + checkedDetails);
    setDetails(checkedDetails);
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
        school +
        "\nDetails : " +
        details
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
      details: details,

    };

    axios.post("https://viibecheck.herokuapp.com/createincident", { report }).then(
      (res) => {
        alert(res.data);
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

        <div className="form-row">
          <div className="col-md">
            <LocationSelect updateLocation={updateLocation} />
          </div>
          <div className="col-md">
            <Phone updatePhone={updatePhone} />
          </div>
          <div className="col-md">
            <Year updateYear={updateYear} />
          </div>
        </div>

        <WorkSchool updateWork={updateWork} updateSchool={updateSchool} />
        <Details updateDetails={updateDetails} />

        <Button id="submit" type="submit" value="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VibeForm;
