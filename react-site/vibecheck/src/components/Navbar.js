import React from "react";
import { Navbar, Button } from "react-bootstrap";

function NavigationBar(props) {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="" style={{ color: "white" }}>
        v i i b e c h e c k
      </Navbar.Brand>
      <Button variant="dark" value="About" onClick={props.pageSelection}>
        About
      </Button>
      <Button variant="dark" value="Search" onClick={props.pageSelection}>
        Search
      </Button>
      <Button variant="dark" value="New Report" onClick={props.pageSelection}>
        New Report
      </Button>
      <Button variant="dark">Resources</Button>
    </Navbar>
  );
}
export default NavigationBar;
