import React, { useState } from "react";
import "./App.css";
import NavigationBar from "./Navbar";
import VibeForm from "./Form.js";
import Search from "./Search";
import About from "./About";
import Home from "./Home";

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
    }
  }

  return (
    <>
      <NavigationBar pageSelection={pageSelection} />
      {display()}
    </>
  );
}

export default App;
