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
        match both the name and phone number you provided and indicated a
        possible risk level.{" "}
      </div>
    );

    console.log("SearchResults:  " + JSON.stringify(searchResults));

    let resultsLength = searchResults ? searchResults.length : 0;
    console.log("resultsLength: " + resultsLength);

    function riskDisplay() {
      if (resultsLength >= 2 && resultsLength <= 3) {
        return (
          <div>Our records indicate that this individual may be SOME RISK</div>
        );
      } else if (resultsLength >= 4 && resultsLength <= 5) {
        return (
          <div>
            Our records indicate that this individual may be MEDIUM RISK
          </div>
        );
      } else if (resultsLength > 5) {
        return (
          <div>
            Our records indicate that this individual is may be HIGH RISK
          </div>
        );
      } else {
        return (
          <div>
            Our records do not contain enough information to provide a risk
            assessment for this individual.{" "}
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
    alert(
      "First Name: " + fName + "\nLast Name: " + lName + "\nPhone: " + phone
    );
    event.preventDefault();

    const search = {
      fName: fName,
      lName: lName,
      phone: phone,
    };

    //Set Loading to True before posting with axios
    setResFetchLoading(true);

    axios
      .post("https://localhost:8080/search", { search })
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
              <Phone updatePhone={updatePhone} />
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
