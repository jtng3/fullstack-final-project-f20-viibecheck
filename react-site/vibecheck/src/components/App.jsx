import React, { useState } from "react";
import "./App.css";
import NavigationBar from "./Navbar";
import VibeForm from "./Form.js";
import Search from "./Search";
import About from "./About";
import Home from "./Home";
import Resources from "./Resources";
import Consent from "./Consent";

function App() {

  const [page, setPage] = useState("Home");

  function pageSelection(event) {
      console.log("PAGE CHANGE!!" + event.currentTarget.value)
    setPage(event.currentTarget.value);
  }

  function display() {
    if (page === "Home") {
      return <Home pageSelection={pageSelection} />;
    }
    if (page === "About") {
      return <About />;
    } else if (page === "Search") {
      return <Search />;
    } else if (page === "New Report") {
      return <VibeForm />;
    } else if (page === "Resources") {
      return <Resources />;
    } else if (page === "Consent") {
      return <Consent />;
    }
  }

  return (
    <>
        <NavigationBar pageSelection={pageSelection} />
        {display()}
    </>
)};

export default App;
