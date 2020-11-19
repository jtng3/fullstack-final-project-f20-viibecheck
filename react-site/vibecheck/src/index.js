import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainCard from './Card';
import NavigationBar from './Navbar';

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar />
    <MainCard />
  </React.StrictMode>,
  document.getElementById('root')
);

