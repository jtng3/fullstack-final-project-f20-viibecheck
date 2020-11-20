const express = require('express');
const app = express();
const port = 5000;

const fetch = require('node-fetch');
const async = require('express-async-await');
const lodash = require('lodash');
const { forEach } = require('lodash');
const regions = ['Africa','Americas','Asia','Europe','Oceania'];

const url = 'https://restcountries.eu/rest/v2/all';
let countries = [];
let sortedByPopulation = [];
let filterByRegions = [];
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Main', heading: 'Welcome to this Website!' });
});

app.get('/main',async function (req, res, next){
  
  const proceedData = async (url) => {
    try{
    const response = await fetch(url);
    countries = await response.json();
    }catch(error){
        console.log(error);
    }
  }
  proceedData(url);
  //console.log("countries:" + countries);
  res.render('page', {
    title: 'Main',
    heading: 'REST Countries',
    countries: countries
  }); 
});

app.get('/populous', async function (req, res, next){

  
  const proceedData = async (url) => {
      try{
      
      const response = await fetch(url);
      var countries = await response.json();
      let populous = [];
      for (const country of countries){
          if (country.population > 20000000)
              populous.push(country);
      }
      sortedByPopulation = lodash.sortBy(populous, (o) => {return o.population;}).reverse();
      
      //console.log(sorted);
      //console.log("number of countries: " + sorted.length);
      }catch(error){
          console.log(error);
      }
  }

  proceedData(url);
  console.log(sortedByPopulation);
  res.render('page', {
    title: 'Main',
    heading: 'REST Countries',
    countries: sortedByPopulation
  }); 
});


app.get('/region', async function (req, res, next){

  const getCountriesByRegion = (data,region) => {
     let regions = [];
      for(var country of data){
         if(country.region === region)
              regions.push(country);
     }
     return regions;
  }
  
  const proceedData = async (url) => {

      try{
          const response = await fetch(url);
          const data = await response.json();
          filterByRegions = [];
          regions.forEach(region =>  filterByRegions[region] = getCountriesByRegion(data,region));
          console.log(filterByRegions['Afica']);
          
          }catch(error){
              console.log(error);
      }

      
  }

  proceedData(url);

  console.log(regions);
  res.render('filter-page', {
    title: 'Main',
    heading: 'REST Countries',
    regions: regions,
    filter: filterByRegions
  });
});


app.get('/about', (req, res) => {
  res.render('page', {
    title: 'About',
    heading: 'About Page',
    subheading: 'Sub-Heading #1',
  });
});

app.get('/contact', (req, res) => {
  res.render('page', {
    title: 'Contact',
    heading: 'Contact Page',
    subheading: 'Sub-Heading #2',
  });
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
