import React from 'react';
import { Navbar } from 'react-bootstrap';

class NavigationBar extends React.Component {

    render() {
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="" style={{color: 'white'}}>VibeCheck</Navbar.Brand>
            </Navbar>
    )}
}

export default NavigationBar;