import "./Form.css";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Name from "./form-components/Name";
import Phone from "./form-components/Phone";



function Search() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");

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
      "First Name: " +
        fName +
        "\nLast Name: " +
        lName +
        "\nPhone: " +
        phone 
    );
    event.preventDefault();

    const search = {
      fName: fName,
      lName: lName,
      phone: phone,
    };

    axios.post("http://localhost:8080/search", { search }).then(
      (res) => {
        //alert(res.data);
        if(res.data.object === null){
          alert(res.data.message);
        }else{
          res.data.object.forEach(element => {
            alert(element.fname +',' + element.lname+','+ element.phone +','+ element.year + ',' + element.work + ',' + element.school + "," + element.details);
          });
        }
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

