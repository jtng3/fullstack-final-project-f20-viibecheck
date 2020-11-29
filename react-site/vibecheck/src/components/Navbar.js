import React from "react";
import { Navbar, Button } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
//import Button from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";

function NavigationBar(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="" style={{ color: "white" }}>
          v i i b e c h e c k
        </Navbar.Brand>
        <Button
          className="m-2"
          color="primary"
          value="Home"
          onClick={props.pageSelection}
        >
          Home
        </Button>
        <Button
          className="m-2"
          color="primary"
          value="About"
          onClick={props.pageSelection}
        >
          About
        </Button>
{/*         <InfoIcon color="secondary" /> */}
        <Button
          className="m-2"
          color="primary"
          value="Search"
          onClick={props.pageSelection}
        >
          Search
        </Button>
        <Button
          className="m-2"
          color="primary"
          value="New Report"
          onClick={props.pageSelection}
        >
          New Report
        </Button>
        <Button className="m-2" >
          Resources
        </Button>
      </Navbar>
    </ThemeProvider>
  );
}
export default NavigationBar;
