import './Form.css';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import LocationSelect from './LocationSelect';
/* class VibeForm extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {name: '', location: '', phone: '',response : ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  } */
 function VibeForm() {
   const [name, setName] = useState("");
   const [location, setLocation] = useState("AL");
   const [phone, setPhone] = useState("");

   function updateName(event) {
     setName(event.target.value);
   }
   function updateLocation(event) {
     setLocation(event.target.value);
   }
   function updatePhone(event) {
     setPhone(event.target.value);
   }
   function handleSubmit(event) {
     alert('Name: ' + name + '\nState: ' + location + '\nPhone: ' + phone);
     event.preventDefault();

     const perp = {
       name: name,
       state: location,
       phone: phone,
     };

     axios.post("http://localhost:8080/createperp", { perp }).then(
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
         <Form.Group id="nameContainer">
           <Form.Label for="name">Name:</Form.Label>
           <Form.Control
             onChange={updateName}
             type="text"
             name="name"
             id="nameInput"
             placeholder="Name"
           ></Form.Control>
         </Form.Group>
         <Form.Group id="stateContainer">
           <Form.Label for="location" id="stateLabel">
             State:
           </Form.Label>
           <LocationSelect onChange={updateLocation} />
        </Form.Group>
        <Form.Group id="phoneContainer">
          <Form.Label for="phone">Phone (xxx-xxx-xxxx):</Form.Label>
          <Form.Control onChange={updatePhone} type="tel" id="phone" name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></Form.Control>
        </Form.Group>
           <Button id="submit" type="submit" value="Submit">
             Submit
           </Button>
           <Button variant="outline-secondary" type="reset" value="Reset">
             Reset
           </Button>
       </Form>
     </div>
   );
 }

 export default VibeForm;