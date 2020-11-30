import "./Form.css";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Name from "./form-components/Name";
import Phone from "./form-components/Phone";


function Search() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");

  //handle search results
  const [resFetchLoading, setResFetchLoading] = useState(false);
  const [resFetchError, setResFetchError] = useState(null);
  const [searchResults, setSearchResults] = useState(undefined);

  const testData = [
    {
      _id: "2834728374",
      fname: "John",
      lname: "Doe",
      state: "CA",
      year: "2014",
      phone: "555-555-5555",
      work: "yes",
      school: "no",
    },
    {
      _id: "9837942839747",
      fname: "John",
      lname: "Doe",
      state: "OR",
      year: "2010",
      phone: "555-555-5555",
      work: "no",
      school: "no",
    },
  ];

  //Render display if params are valid, else display appropriate message
  const renderSearchResults = () => {
    let content = (
      <div>
        Please submit a search. We search our database for any reports that
        match both the name and phone number provided and indicate a
        possible risk level.
      </div>
    );

    console.log("SearchResults:  " + JSON.stringify(searchResults));

    let resultsLength = searchResults ? searchResults.length : 0;
    console.log("resultsLength: " + resultsLength);

    function riskDisplay() {
      if (resultsLength >= 2 && resultsLength <= 3) {
        return (
          <div class="alert alert-custom-low fade in alert-dismissable show" role="alert">Our records indicate that this individual may be <strong>SOME RISK</strong></div>
        );
      } else if (resultsLength >= 4 && resultsLength <= 5) {
        return (
          <div class="alert alert-custom-medium fade in alert-dismissable show" role="alert">
            Our records indicate that this individual may be <strong>MEDIUM RISK</strong>
          </div>
        );
      } else if (resultsLength > 5) {
        return (
          <div class="alert alert-custom-high fade in alert-dismissable show" role="alert">
            Our records indicate that this individual is may be <strong>HIGH RISK</strong>
          </div>
        );
      } else {
        return (
          <div class="alert alert-custom-neutral fade in alert-dismissable show" role="alert">
            Our records do not contain enough information to provide a risk
            assessment for this profile.
          </div>
        );
      }
    }

    if (resFetchLoading) {
      content = <div label="Loading...">LOADING...</div>;
    } else if (
      !resFetchLoading &&
      !resFetchError &&
      searchResults !== undefined
    ) {
      content = <div>{riskDisplay()}</div>;
    } else if (!resFetchLoading && resFetchError) {
      content = <div>Search Failed.</div>;
    }
    return content;
  };

  function updateFName(event) {
    setFName(event.target.value);
  }
  function updateLName(event) {
    setLName(event.target.value);
  }
  function updatePhone(event) {
    setPhone(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const search = {
      fName: fName.toUpperCase(),
      lName: lName.toUpperCase(),
      phone: phone,
    };

    //Set Loading to True before posting with axios
    setResFetchLoading(true);

    axios
      .post("http://localhost:8080/search", { search })
      .then((res) => {
        console.log("axios response: " + JSON.stringify(res));
        if (res.statusText !== "OK") {
          return res.status.then((error) => {
            throw new Error(JSON.stringify(error));
          });
        }
        //this is if results is not received as "object" within "data"
        //return res.data;
        // this will work with nhan's modified code showing message and object within data
        return res.data.object;
      })
      .then((data) => {
        setSearchResults(data);
        setResFetchError(null);
        setResFetchLoading(false);
        console.log("we are in second: " + JSON.stringify(data));
      })
      .catch((err) => {
        console.warn(err);
        setResFetchError(err);
        setResFetchLoading(false);
      });
  }

  return (
    <Card id="search-card">
      <Card.Body>
        <Card.Title>VibeCheck Search</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Name updateFName={updateFName} updateLName={updateLName} />

          <div className="form-row">
            <div className="col">
              <Phone setPhone={setPhone} phone={phone} />
            </div>
          </div>
          <Button id="submit" type="submit" value="Submit">
            Search
          </Button>
          {renderSearchResults()}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Search;
