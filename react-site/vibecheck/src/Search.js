import React from 'react';
import { Form, Button } from 'react-bootstrap';

// This component will allow the user to see whether a person is in the database 
// Currently it's identical to Form.js, but the functionality of handleSubmit will be slightly different. 
// Thinking of having conditional rendering to display the results of the search

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', location: '', phone: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
      }
    
      // Updates state as the user types
      handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: target.value
        });
      }

      // Submits form to database (eventually)
      handleSubmit(event) {
        alert('Name: ' + this.state.name + '\nState: ' + this.state.location + '\nPhone: ' + this.state.phone);
        event.preventDefault();
      }
    
      // Resets form to default values
      handleReset() {
        this.setState({name: '', location: '', phone: ''});
      }

    render() {
        return (
          <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <Form.Group id="nameContainer">
              <Form.Label for="name">Name:</Form.Label>
              <Form.Control type="text" name="name" id="nameInput" onChange={this.handleChange}></Form.Control>
            </Form.Group>
            <Form.Group id="stateContainer">
            <Form.Label for="location" id="stateLabel">State:</Form.Label>
            <Form.Control as="select" value={this.state.value} id="stateSelect" name="location" onChange={this.handleChange} required>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AR">AR</option>	
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>	
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>	
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>	
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>			
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>	
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="phoneContainer">
              <Form.Label for="phone">Phone (xxx-xxx-xxxx):</Form.Label>
              <Form.Control onChange={this.handleChange} type="tel" id="phone" name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></Form.Control>
            </Form.Group>
            <Button id="submit" type="submit" value="Submit">Submit</Button>
            <Button variant="outline-secondary" type="reset" value="Reset">Reset</Button>
          </Form>
        )
      }
}

export default Search;