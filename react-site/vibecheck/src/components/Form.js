import "./Form.css";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Collapsible from 'react-collapsible';
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

  //this value is reversed, i.e. false is when form hasn't been submitted
  const [submitStatus, setSubmitStatus] = useState(false);

  //handle report insert status
  const [repInsertLoading, setRepInsertLoading] = useState(false);
  const [repInsertError, setRepInsertError] = useState(null);
  const [insertedReport, setInsertedReport] = useState(undefined);

  const renderInsertedReport = () => {
    let content = <div></div>;
    console.log(submitStatus);
    console.log("InsertResults:  " + JSON.stringify(insertedReport));

    function insertDisplay() {
      return insertedReport.message;
    }

    if (repInsertLoading) {
      content = (
        <div label="Loading..." className="alert alert-info">
          LOADING...
        </div>
      );
    } else if (
      !repInsertLoading &&
      !repInsertError &&
      insertedReport !== undefined
    ) {
      if (insertedReport.object === true) {
        content = <div class="alert alert-success">{insertDisplay()}</div>;
      } else {
        content = <div class="alert alert-warning">{insertDisplay()}</div>;
      }
    } else if (!repInsertLoading && repInsertError) {
      content = <div className="alert alert-danger">Insert Failed.</div>;
    }
    return content;
  };

  function updateFName(event) {
    setFName(event.target.value);
  }
  function updateLName(event) {
    setLName(event.target.value);
  }
  function updateLocation(event) {
    setLocation(event.target.value);
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
      console.log("push value is: " + value);
      checkedDetails.push(value);
      console.log("pushed");
    } else {
      console.log("remove value is: " + value);
      const index = checkedDetails.indexOf(value);
      console.log("remove index is: " + index);
      if (index > -1) {
        checkedDetails.splice(index, 1);
        console.log("spliced");
      }
    }
    //console.log("New checkedDetails: " + checkedDetails);
    setDetails(checkedDetails);
  }

  function handleSubmit(event) {

    setSubmitStatus(true);

    console.log(
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
      fName: fName.toUpperCase(),
      lName: lName.toUpperCase(),
      state: location,
      phone: phone,
      year: year,
      work: work,
      school: school,
      details: details,
    };
    setRepInsertLoading(true);

    axios
      .post("https://localhost:8080/createincident", { report })
      .then((res) => {
        console.log(res.data);
        setInsertedReport(res.data);
        setRepInsertError(null);
        setRepInsertLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        setRepInsertError(err);
        setRepInsertLoading(false);
      });
  }

  return (
    <Card id="form-card">
      <Card.Body>
        <Card.Title>New Incident Report</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Name updateFName={updateFName} updateLName={updateLName} />

          <div className="form-row">
            <div className="col-md">
              <LocationSelect updateLocation={updateLocation} />
            </div>
            <div className="col-md">
              <Phone setPhone={setPhone} phone={phone} />
            </div>
            <div className="col-md">
              <Year updateYear={updateYear} />
            </div>
          </div>

          <WorkSchool updateWork={updateWork} updateSchool={updateSchool} />
          <Collapsible trigger="Add Specific Details? These are entirely optional.">
            <Details updateDetails={updateDetails} />
          </Collapsible>
          <Button disabled={submitStatus} id="submit" type="submit" value="Submit">
            Submit
          </Button>
          <Button id="reset" type="reset" value="Reset" variant="outline-secondary" onClick={() => {setSubmitStatus(false); setPhone(null)}}>
            Reset
          </Button>
          <br />
          <br />
          {renderInsertedReport()}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default VibeForm;
