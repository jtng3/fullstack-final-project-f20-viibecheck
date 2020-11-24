import React from 'react';
import { Navbar } from 'react-bootstrap';

class NavigationBar extends React.Component {

    render() {
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="">VibeCheck</Navbar.Brand>
            </Navbar>
    )}
}

export default NavigationBar;